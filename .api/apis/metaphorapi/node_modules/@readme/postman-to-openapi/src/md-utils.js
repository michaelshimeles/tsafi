const { marked } = require('marked');

const supHeaders = ['object', 'name', 'description', 'example', 'type', 'required'];

function parseMdTable(md) {
  const parsed = marked.lexer(md);
  const table = parsed.find(el => el.type === 'table');
  if (table == null) {
    return {};
  }

  const { header: rawHeader, rows } = table;
  const cells = rows.map(row => row.map(e => e.text));
  const header = rawHeader.map(e => e.text);
  if (!header.includes('object') || !header.includes('name')) {
    return {};
  }

  const headers = header.map(h => (supHeaders.includes(h) ? h : false));
  const tableObj = cells.reduce((accTable, cell) => {
    const cellObj = cell.reduce((accCell, field, index) => {
      if (headers[index]) {
        // eslint-disable-next-line no-param-reassign
        accCell[headers[index]] = field;
      }

      return accCell;
    }, {});

    // eslint-disable-next-line no-param-reassign
    accTable[cellObj.name] = cellObj;
    return accTable;
  }, {});

  return tableObj;
}

module.exports = { parseMdTable };
