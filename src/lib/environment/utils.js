// @ts-nocheck Lexical's types... Klassiker
import { $getSelection, $isRangeSelection, $isNodeSelection, $isElementNode } from 'lexical';
import { $findMatchingParent } from '@lexical/utils';
import { $isAtNodeEnd as isAtNodeEnd } from '@lexical/selection';

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const CAN_USE_DOM =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

export const IS_APPLE =
  CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export function getSelectedElements() {
  const selection = $getSelection();

  if (!$isRangeSelection(selection) && !$isNodeSelection(selection)) {
    return [];
  }

  const nodes = selection.getNodes();

  if (nodes.length === 0) return [];

  /**
   * @type {Map<string, ElementNode>}
   */
  const elements = new Map();

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    const parent = $findMatchingParent(
      node,
      (parentNode) =>
        $isElementNode(parentNode) && !parentNode.isInline(),
    );
    if (!parent) continue;
    elements.set(parent.getKey(), /** @type {ElementNode} */(parent))
  }

  return [...elements.values()];
}

// from svelte-lexical
export default function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return isAtNodeEnd(focus) ? anchorNode : focusNode;
  }
  else {
    return isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}
