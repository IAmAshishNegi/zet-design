import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { B2, B3, B8, SH3, SH4, SH5, SH6, SH8 } from '../typography/typography'; // Corrected import path
import { ChevronRightIcon } from '../icons'; // Using ChevronRightIcon
import { colors } from '../../../styles/theme';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onPress: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onPress }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.questionContainer}>
        <SH3 className="flex-1 text-neutral-800">{question}</SH3>
        <View style={isOpen ? styles.iconOpen : styles.iconClosed}>
          <ChevronRightIcon size={20} color={colors.neutral[600]} />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.answerContainer}>
          <B8 className="text-neutral-600">{answer}</B8>
        </View>
      )}
    </View>
  );
};

interface AccordionProps {
  items: Array<{ question: string; answer: string }>;
  defaultOpenIndex?: number;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex !== undefined ? defaultOpenIndex : null);

  const handleItemPress = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.accordionContainer}>
      {items.map((item, index) => (
        <View key={index} style={[styles.itemWrapper, index === items.length - 1 && styles.lastItemWrapper]}>
          <AccordionItem
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onPress={() => handleItemPress(index)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    borderRadius: 12,
    backgroundColor: colors.neutral[0],
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  lastItemWrapper: {
    borderBottomWidth: 0,
  },
  itemContainer: {},
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  answerContainer: {
    paddingTop: 0,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  iconOpen: {
    transform: [{ rotate: '90deg' }],
  },
  iconClosed: {
    transform: [{ rotate: '0deg' }], // Standard direction for ChevronRight
  },
}); 