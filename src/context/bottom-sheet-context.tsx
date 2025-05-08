import React, { createContext, useState, useCallback, ReactNode, useRef, useContext } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/theme';

interface BottomSheetContextProps {
  showBottomSheet: (content: ReactNode, snapPoints?: string[], options?: BottomSheetOptions) => void;
  hideBottomSheet: () => void;
}

interface BottomSheetOptions {
  hideHandle?: boolean;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [snapPoints, setSnapPoints] = useState<string[]>(['50%']); // Default snap points
  const [hideHandle, setHideHandle] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const showBottomSheet = useCallback((
    newContent: ReactNode, 
    newSnapPoints: string[] = ['30%'],
    options?: BottomSheetOptions
  ) => {
    console.log('Context: Showing bottom sheet');
    if (newContent === null) {
      hideBottomSheet();
      return;
    }
    setContent(newContent);
    setSnapPoints(newSnapPoints);
    setHideHandle(options?.hideHandle || false);
    setIsVisible(true);
    bottomSheetRef.current?.expand(); // Expand to the first snap point
  }, []);

  const hideBottomSheet = useCallback(() => {
    console.log('Context: Hiding bottom sheet');
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setIsVisible(false);
      setContent(null);
    }, 200);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('Global Bottom sheet index changed:', index);
    if (index === -1) {
      setIsVisible(false);
      setContent(null);
    }
  }, []);

  // Render backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Start expanded
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}
          handleComponent={hideHandle ? () => null : undefined}
          handleIndicatorStyle={!hideHandle ? styles.bottomSheetIndicator : undefined}
          enableContentPanningGesture={false} // Disable content panning to avoid interference with scrolling
          enableHandlePanningGesture={true}
          keyboardBehavior="interactive"
          android_keyboardInputMode="adjustResize"
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            {content}
          </BottomSheetView>
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextProps => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 1100, // Ensure it's above tab bar (tab bar zIndex might be around 1000)
    elevation: 10,
    // Position absolute is handled by the library, no need to set explicitly here
  },
  bottomSheetContent: {
    flex: 1, // Allow content to take up space
    padding: 0, // Remove padding so child components can manage their own padding
  },
  bottomSheetIndicator: {
    width: 40,
    height: 4,
    backgroundColor: colors.neutral[400],
    borderRadius: 2,
  },
}); 