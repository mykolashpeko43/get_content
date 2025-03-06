import React, {useState, useRef} from 'react';
import {View, TextInput, Text, Button, StyleSheet, ScrollView} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  const [url, setUrl] = useState('');
  const [pageUrl, setPageURL] = useState('');
  const [content, setContent] = useState('');
  const webViewRef = useRef(null);

  const handleMessage = async (event: any) => {
    const htmlContent = event.nativeEvent.data;
    console.log('HTML Content:', htmlContent);
    setContent(htmlContent);
  };

  const handleInputChange = (text: string) => {
    setUrl(text);
  };

  const loadPage = () => {
    setPageURL(url)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter URL"
        value={url}
        onChangeText={handleInputChange}
      />
      <Button title="Get HTML Content" onPress={loadPage} />
      <ScrollView style={styles.content}>
        <Text>{content ? content : "No content yet"}</Text>
      </ScrollView>
      <WebView
        ref={webViewRef}
        source={{uri: pageUrl}}
        onMessage={handleMessage}
        injectedJavaScriptBeforeContentLoaded={`
          (function() {
            const htmlContent = document.documentElement.outerHTML;
            window.ReactNativeWebView.postMessage(htmlContent);
          })();
        `}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: 20,
    fontSize: 12,
    color: 'gray',
  },
});
