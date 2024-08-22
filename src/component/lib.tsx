import styled from "@emotion/styled";

export const Row = styled.div<{
    setSpaceBetween?: boolean
    marginRight?: number | boolean
    marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.setSpaceBetween ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom + "rem"};

  > * { //   >* 设置其下所有子元素的属性
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.marginRight === 'number' ? props.marginRight + 'rem' : props.marginRight ? '2rem' : undefined};
  }
`