import React from 'react';

export type MeatId = 'beef' | 'pork' | 'poultry';

export interface DonenessLevel {
  id: string;
  label: string; // e.g., "Medium Rare"
  temp: number; // Target temperature in Celsius
  color: string; // CSS color for the center visualization
  description: string;
  isRecommended?: boolean;
}

export interface SubCut {
  id: string;
  name: string;
  donenessLevels: DonenessLevel[];
}

export interface MeatData {
  id: MeatId;
  name: string;
  Icon: React.ElementType;
  donenessLevels: DonenessLevel[];
  subCuts?: SubCut[];
}

export type Theme = 'light' | 'dark';