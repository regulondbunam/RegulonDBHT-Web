import styled from 'styled-components'

export const TableStyles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
        background-color: #cadce7;
        :hover{
            color: white;
            background-color: #72a7c7;
        }
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th{
        color: white;
        background-color: #32617d;
        padding: 0.5rem;
        .resizer {
            display: inline-block;
            background: white;
            width: 5px;
            height: 100%;
            position: absolute;
            right: 3px;
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
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 1px solid black;
      }
    }
  }
`