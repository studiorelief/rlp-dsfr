import markerSDK from '@marker.io/browser';

export async function launchMarkerSDK() {
  const widget = await markerSDK.loadWidget({
    project: '67179fdffebba6c799f82437',
  });
  return widget;
}
