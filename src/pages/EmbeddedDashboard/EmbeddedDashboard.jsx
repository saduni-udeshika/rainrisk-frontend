import { useEffect } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

export const EmbeddedDashboard = () => {
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-project-0-foocd/public/dashboards/3205405e-503f-49b5-aef6-d56502fdf1e6', // Replace with your MongoDB Charts base URL
    });

    const dashboard = sdk.createDashboard({
      dashboardId: '64eb05422ad92968c5a63e1e', // Replace with your MongoDB Charts dashboard ID
    });

    dashboard
      .render(document.getElementById('embedded-dashboard'),
      {
        width: '100%',
        height: '700px',
      })
      .catch(() => window.alert('Dashboard failed to initialize'));
  }, []);

  return (
    <div>
      <div id="embedded-dashboard" style={{ width: '100%', height: '700px' }} />
    </div>
  );
};

export default EmbeddedDashboard;