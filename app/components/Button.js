// @flow
import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { ExpandedIcon } from 'outline-icons';

const RealButton = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0;
  border: 0;
  background: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonText};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  height: ${props => (props.small ? 24 : 36)}px;
  text-decoration: none;
  text-transform: uppercase;
  flex-shrink: 0;
  outline: none;
  cursor: pointer;
  user-select: none;

  svg {
    fill: ${props => props.theme.buttonText};
  }

  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  &:hover {
    background: ${props => darken(0.05, props.theme.buttonBackground)};
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    color: ${props => props.theme.textTertiary};
  }

  ${props =>
    props.neutral &&
    `
    background: ${props.theme.buttonNeutralBackground};
    color: ${props.theme.buttonNeutralText};
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px;
    border: 1px solid ${darken(0.1, props.theme.buttonNeutralBackground)};

    svg {
      fill: ${props.theme.buttonNeutralText};
    }

    &:hover {
      background: ${darken(0.05, props.theme.buttonNeutralBackground)};
      border: 1px solid ${darken(0.15, props.theme.buttonNeutralBackground)};
    }
  `} ${props =>
      props.danger &&
      `
      background: ${props.theme.danger};
      color: ${props.theme.white};

    &:hover {
      background: ${darken(0.05, props.theme.danger)};
    }
  `};
`;

const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${props => props.hasIcon && 'padding-left: 4px;'};
`;

const Inner = styled.span`
  display: flex;
  padding: 0 ${props => (props.small ? 8 : 12)}px;
  padding-right: ${props => (props.disclosure ? 2 : props.small ? 8 : 12)}px;
  line-height: ${props => (props.small ? 24 : 28)}px;
  justify-content: center;
  align-items: center;

  ${props =>
    props.hasIcon &&
    (props.small ? 'padding-left: 6px;' : 'padding-left: 8px;')};
`;

export type Props = {
  type?: string,
  value?: string,
  icon?: React.Node,
  className?: string,
  children?: React.Node,
  small?: boolean,
  disclosure?: boolean,
};

export default function Button({
  type = 'text',
  icon,
  children,
  value,
  disclosure,
  small,
  ...rest
}: Props) {
  const hasText = children !== undefined || value !== undefined;
  const hasIcon = icon !== undefined;

  return (
    <RealButton small={small} type={type} {...rest}>
      <Inner hasIcon={hasIcon} small={small} disclosure={disclosure}>
        {hasIcon && icon}
        {hasText && <Label hasIcon={hasIcon}>{children || value}</Label>}
        {disclosure && <ExpandedIcon />}
      </Inner>
    </RealButton>
  );
}
