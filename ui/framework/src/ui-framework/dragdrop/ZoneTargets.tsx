/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import * as React from "react";

import { TargetChangeHandler } from "../frontstage/FrontstageComposer";

import { Container as ZoneTargetsContainer, Merge as MergeTarget, Back as BackTarget, WidgetZoneIndex, DropTarget, TargetType } from "@bentley/ui-ninezone";
import { CommonProps } from "@bentley/ui-core";

/** Properties for the [[ZoneTargets]] component.
 * @internal
 */
export interface ZoneTargetsProps extends CommonProps {
  zoneId: WidgetZoneIndex;
  dropTarget: DropTarget;
  targetChangeHandler: TargetChangeHandler;
}

/** Zone Targets React component.
 * @internal
 */
export class ZoneTargets extends React.Component<ZoneTargetsProps> {
  public render(): React.ReactNode {
    return (
      <ZoneTargetsContainer className={this.props.className} style={this.props.style}>
        {this.getTarget()}
      </ZoneTargetsContainer>
    );
  }

  private getTarget() {
    switch (this.props.dropTarget) {
      case DropTarget.Merge:
        return (
          <MergeTarget
            onTargetChanged={(isTargeted) => this.props.targetChangeHandler.handleTargetChanged(this.props.zoneId, TargetType.Merge, isTargeted)}
          />
        );
      case DropTarget.Back:
        return (
          <BackTarget
            zoneIndex={this.props.zoneId}
            onTargetChanged={(isTargeted) => this.props.targetChangeHandler.handleTargetChanged(this.props.zoneId, TargetType.Back, isTargeted)}
          />
        );
      case DropTarget.None:
      default:
        return undefined;
    }
  }
}
