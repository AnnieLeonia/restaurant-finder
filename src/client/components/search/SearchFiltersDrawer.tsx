import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchFilterState } from "@/common/searchFilters";

import SearchFilters from "./SearchFilters";
import styles from "./searchFiltersDrawer.style";

export interface SearchFiltersDrawerProps {
  visible: boolean;
  onClose: () => void;
  filters: SearchFilterState;
  onChange: (next: SearchFilterState) => void;
}

const SearchFiltersDrawer = ({
  visible,
  onClose,
  filters,
  onChange,
}: SearchFiltersDrawerProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const drawerWidth = useMemo(
    () => Math.min(Math.round(windowWidth * 0.88), 400),
    [windowWidth],
  );

  const translateX = useRef(new Animated.Value(drawerWidth)).current;

  useEffect(() => {
    if (!visible) return;
    translateX.setValue(drawerWidth);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [visible, drawerWidth, translateX]);

  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: drawerWidth,
      duration: 240,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <Animated.View
          style={[
            styles.panel,
            {
              width: drawerWidth,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.panelInner}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filter</Text>
              <Pressable
                onPress={handleClose}
                style={styles.closeHit}
                accessibilityRole="button"
                accessibilityLabel="Stäng filter"
              >
                <Text style={styles.closeSymbol}>×</Text>
              </Pressable>
            </View>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              <SearchFilters filters={filters} onChange={onChange} />
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SearchFiltersDrawer;
