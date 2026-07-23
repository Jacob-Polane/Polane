import { useTheme } from "@shesha/mobile-components";
import {
  syncManager,
  useShaAuthentication,
  type IOfflineConfig,
} from "@shesha/mobile-core";
import {
  SyncGateScreen,
  useSyncOnLaunch,
  useSyncStore,
} from "@shesha/mobile-designer";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = IOfflineConfig & {
  forms?: string[];
  doneDelayMs?: number;
  syncEvery?: number;
  isRequired?: boolean;
};

const BANNER_HEIGHT = 32;
const BAR_H = 3;

const ShaSync: FC<Props> = (props) => {
  const { forms = [], data = [], refLists = [] } = props;
  const hasWork = forms.length > 0 || data.length > 0 || refLists.length > 0;

  if (!hasWork) return null;

  return <ShaSyncInner {...props} />;
};

const ShaSyncInner: FC<Props> = ({
  forms = [],
  data = [],
  refLists = [],
  doneDelayMs = 2000,
  syncEvery,
  syncInterval,
  serverConfigured,
  concurrency,
  defaultTtl,
  formFetchPath,
  isRequired = false,
}) => {
  const { themeColors } = useTheme();
  const accent = (themeColors?.primaryColor as string) ?? "#2F80ED";

  const { isAuthorized } = useShaAuthentication();
  useSyncOnLaunch({
    isAuthorized,
    forms,
    data,
    refLists,
    syncEvery: syncEvery ?? defaultTtl,
    syncInterval,
    serverConfigured,
    concurrency,
    formFetchPath,
  });

  const { status, progress, completed, total, current } = useSyncStore();

  // ── Full-offline: force sync on launch ─────────────────────────────────
  useEffect(() => {
    if (isRequired && isAuthorized) {
      void syncManager.sync(true);
    }
  }, [isRequired, isAuthorized]);

  // ── Modal state ────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);

  // isRequired: auto-open modal, not dismissable until sync completes
  const syncComplete =
    status === "success" || status === "partial" || status === "error";
  const forceModal = isRequired && isAuthorized && !syncComplete;

  useEffect(() => {
    if (forceModal) setModalOpen(true);
  }, [forceModal]);

  // ── Banner visibility ──────────────────────────────────────────────────
  const [bannerVisible, setBannerVisible] = useState(true);
  const pct = useMemo(
    () =>
      Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0,
    [progress],
  );
  const isRunning = status === "running";
  const showBanner = isRunning || (syncComplete && bannerVisible);

  useEffect(() => {
    if (!syncComplete) return;
    const t = setTimeout(() => setBannerVisible(false), doneDelayMs);
    return () => clearTimeout(t);
  }, [syncComplete, doneDelayMs]);

  // ── Banner animation ──────────────────────────────────────────────────
  const slideAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: showBanner && isAuthorized ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [showBanner, isAuthorized, slideAnim]);

  useEffect(() => {
    Animated.timing(barAnim, {
      toValue: pct,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [pct, barAnim]);

  const bannerHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BANNER_HEIGHT],
  });

  const barWidth = barAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const bannerLabel = isRunning
    ? (current ?? "Syncing…")
    : status === "success"
      ? "Sync complete"
      : status === "partial"
        ? `Done · ${completed}/${total}`
        : status === "error"
          ? "Sync failed"
          : "";

  const bannerBg = syncComplete
    ? status === "error"
      ? "#D64545"
      : "#2F7D32"
    : accent;

  if (!isAuthorized) return null;

  return (
    <>
      {/* ── Sync banner ─────────────────────────────────────────── */}
      <TouchableOpacity activeOpacity={0.8} onPress={() => setModalOpen(true)}>
        <Animated.View
          style={[
            styles.banner,
            { height: bannerHeight, backgroundColor: bannerBg },
          ]}
        >
          <Text style={styles.bannerText} numberOfLines={1}>
            {bannerLabel}
          </Text>
          {isRunning && (
            <Text style={styles.bannerPct}>{`${pct.toFixed(0)}%`}</Text>
          )}
        </Animated.View>
        {isRunning && (
          <View style={styles.barTrack}>
            <Animated.View
              style={[
                styles.barFill,
                { width: barWidth, backgroundColor: accent },
              ]}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* ── Full-screen detail modal ────────────────────────────── */}
      <Modal
        visible={modalOpen || forceModal}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          if (!forceModal) setModalOpen(false);
        }}
      >
        <SyncGateScreen onContinue={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  bannerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  bannerPct: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    marginLeft: 8,
  },
  barTrack: {
    height: BAR_H,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  barFill: {
    height: BAR_H,
  },
});

export default ShaSync;
