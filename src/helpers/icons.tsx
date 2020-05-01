import React from 'react';
import {
  FaGrinAlt,
  FaFlag,
  FaCheck,
  FaUserCheck,
  FaRunning,
  FaHandPointDown,
  FaAppleAlt,
  FaPlus,
} from 'react-icons/fa';

export type AvailableIcons =
  'grin' |
  'flag' |
  'check' |
  'user-check' |
  'running' |
  'point-down' |
  'apple' |
  'plus'
;

const componentMap = new Map([
  ['grin', <FaGrinAlt />],
  ['flag', <FaFlag />],
  ['check', <FaCheck />],
  ['user-check', <FaUserCheck />],
  ['running', <FaRunning />],
  ['point-down', <FaHandPointDown />],
  ['apple', <FaAppleAlt />],
  ['plus', <FaPlus />]
]);

export default function (type: AvailableIcons) {
  return componentMap.get(type);
}
