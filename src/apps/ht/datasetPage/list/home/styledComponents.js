import styled from 'styled-components'

export const TableStyles = styled.div`
overflow: auto;

  .table {
    float: left;
    border-spacing: 0;



    .th{
      font-size: 14px;
      text-align: center;
      color: #ffffff;
      background: #32617d;
      font-weight: bold;
      padding: 2px;
        .resizer {
            display: inline-block;
            background: #3d779b;
            width: 5px;
            height: 100%;
            position: absolute;
            right: 0px;
            top: 0;
            transform: translateX(50%);
            z-index: 1;
            ${'' /* prevents from scrolling while dragging on touch devices */}
            touch-action:none;
    
            &.isResizing {
              background: #c93a1d;
            }
          }
    }
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #3d779b;
      border-right: 1px solid #3d779b;
      color: #666666;
      overflow: hidden;
      :last-child {
        border-right: 1px solid #3d779b;
      }
    }
  }
`