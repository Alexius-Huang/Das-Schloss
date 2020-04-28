import React from 'react';
import {
  FaGrinAlt,
  FaFlag,
  FaCheck,
  FaUserCheck,
  FaRunning,
  FaHandPointDown,
  FaAppleAlt,
} from 'react-icons/fa';

export type AvailableIcons =
  'grin' |
  'flag' |
  'check' |
  'user-check' |
  'running' |
  'point-down' |
  'apple'
;

const componentMap = new Map([
  ['grin', <FaGrinAlt />],
  ['flag', <FaFlag />],
  ['check', <FaCheck />],
  ['user-check', <FaUserCheck />],
  ['running', <FaRunning />],
  ['point-down', <FaHandPointDown />],
  ['apple', <FaAppleAlt />]
]);

export default function (type: AvailableIcons) {
  return componentMap.get(type);
}
