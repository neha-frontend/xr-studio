import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityEditor = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'testBuild/Build/testBuild.loader.js',
    dataUrl: 'testBuild/Build/testBuild.data',
    frameworkUrl: 'testBuild/Build/testBuild.framework.js',
    codeUrl: 'testBuild/Build/testBuild.wasm'
  });

  return (
    <Unity
      style={{
        width: '100%',
        height: '100%'          
      }}
      unityProvider={unityProvider}
    />
  );
};

export default UnityEditor;
