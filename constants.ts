import React from 'react';
import { MeatData } from './types';

// Emoji Icons
// Using React.createElement since this is a .ts file

const PoultryIcon = (props: React.HTMLAttributes<HTMLSpanElement>) => 
  React.createElement("span", {
    ...props,
    role: "img",
    "aria-label": "slepice",
    style: { display: 'inline-block', lineHeight: 1 }
  }, "🐔");

const PorkIcon = (props: React.HTMLAttributes<HTMLSpanElement>) => 
  React.createElement("span", {
    ...props,
    role: "img",
    "aria-label": "prase",
    style: { display: 'inline-block', lineHeight: 1 }
  }, "🐷");

const BeefIcon = (props: React.HTMLAttributes<HTMLSpanElement>) => 
  React.createElement("span", {
    ...props,
    role: "img",
    "aria-label": "kráva",
    style: { display: 'inline-block', lineHeight: 1 }
  }, "🐮");

export const MEAT_DATA: MeatData[] = [
  {
    id: 'beef',
    name: 'Hovězí',
    Icon: BeefIcon,
    donenessLevels: [
      {
        id: 'blue',
        label: 'Blue (Krvavé)',
        temp: 48,
        color: '#7f1d1d', // Deep red
        description: 'Ožehnuté zvenčí, uvnitř téměř syrové a studené.',
      },
      {
        id: 'rare',
        label: 'Rare (Jemně propečené)',
        temp: 52,
        color: '#991b1b', // Red
        description: 'Uvnitř stále krvavé, ale teplé. Šťavnaté.',
      },
      {
        id: 'medium-rare',
        label: 'Medium Rare',
        temp: 57,
        color: '#ef4444', // Bright red/pink
        description: 'Růžový střed, šťavnaté. Nejoblíbenější úprava steaků.',
        isRecommended: true,
      },
      {
        id: 'medium',
        label: 'Medium (Středně propečené)',
        temp: 63,
        color: '#ec4899', // Pink
        description: 'Světle růžový střed, pevnější konzistence.',
      },
      {
        id: 'medium-well',
        label: 'Medium Well',
        temp: 68,
        color: '#db2777', // Dark pink/grey
        description: 'Téměř propečené, jen náznak růžové.',
      },
      {
        id: 'well-done',
        label: 'Well Done (Propečené)',
        temp: 71,
        color: '#be185d', // Grey/Brownish
        description: 'Zcela propečené, bez růžové barvy. Méně šťavnaté.',
      }
    ]
  },
  {
    id: 'pork',
    name: 'Vepřové',
    Icon: PorkIcon,
    donenessLevels: [
      {
        id: 'medium',
        label: 'Medium (Růžové)',
        temp: 63,
        color: '#f472b6',
        description: 'Šťavnaté s růžovým nádechem. Moderní bezpečná úprava.',
        isRecommended: true,
      },
      {
        id: 'well-done',
        label: 'Well Done (Propečené)',
        temp: 71,
        color: '#cbd5e1', // Light grey
        description: 'Tradiční úprava, maso je zcela bílé/šedé.',
      }
    ]
  },
  {
    id: 'poultry',
    name: 'Drůbež',
    Icon: PoultryIcon,
    donenessLevels: [], // Placeholder, subCuts used instead
    subCuts: [
      {
        id: 'breast',
        name: 'Kuřecí prsa',
        donenessLevels: [
          {
            id: 'safe',
            label: 'Bezpečně propečené',
            temp: 74,
            color: '#e2e8f0', // White
            description: 'Maso je zcela bílé, šťavnaté, ale bezpečné ke konzumaci.',
            isRecommended: true
          }
        ]
      },
      {
        id: 'thigh',
        name: 'Kuřecí stehna',
        donenessLevels: [
          {
            id: 'safe',
            label: 'Bezpečně propečené',
            temp: 74,
            color: '#cbd5e1', 
            description: 'Minimální teplota pro bezpečnost.',
          },
          {
            id: 'optimal',
            label: 'Optimální (Křehké)',
            temp: 82,
            color: '#94a3b8', // Darker grey
            description: 'Vyšší teplota zajistí rozpad kolagenu a maximální křehkost tmavého masa.',
            isRecommended: true
          }
        ]
      }
    ]
  }
];