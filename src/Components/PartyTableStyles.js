export const PartyTableStyles = `
/* Use overflow:scroll on your container to enable scrolling: */

.div {
  max-width: 400px;
  max-height: 150px;
  overflow: scroll;
}


/* Use position: sticky to have it stick to the edge
 * and top, right, or left to choose which edge to stick to: */

.thead th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 0;
}

.tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
}


/* To have the header in the first column stick to the left: */

.thead th:first-child {
  left: 0;
  z-index: 2;
}


/* Just to display it nicely: */

.thead th {
  background: #000;
  color: #FFF;
  /* Ensure this stays above the emulated border right in tbody th {}: */
  z-index: 1;
}

.tbody th {
  background: #FFF;
  border-right: 1px solid #CCC;
  /* Browsers tend to drop borders on sticky elements, so we emulate the border-right using a box-shadow to ensure it stays: */
  box-shadow: 1px 0 0 0 #ccc;
}

.table {
  border-collapse: collapse;
}

.td,
th {
  padding: 0.5em;
}
`;