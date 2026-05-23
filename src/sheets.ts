export const getOrCreateSpreadsheet = async (accessToken: string): Promise<string> => {
  const savedId = localStorage.getItem('freshcart_spreadsheet_id');
  
  if (savedId) {
    return savedId;
  }

  // Create a new spreadsheet
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'FreshCart Orders',
      },
      sheets: [
        {
          properties: {
            title: 'Orders',
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create spreadsheet');
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  
  // Set headers
  await appendRow(accessToken, spreadsheetId, [
    'Date Submitted',
    'Customer Name',
    'Customer Email',
    'Shipping Address',
    'Total Amount (KES)',
    'Items Config',
  ]);

  localStorage.setItem('freshcart_spreadsheet_id', spreadsheetId);
  return spreadsheetId;
}

export const appendRow = async (accessToken: string, spreadsheetId: string, values: string[]) => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders!A:F:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [values],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to append row to spreadsheet');
  }
}
