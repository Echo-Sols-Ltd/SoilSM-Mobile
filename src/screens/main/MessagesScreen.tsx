import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, typography, spacing} from '@theme';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
}

export const MessagesScreen: React.FC = () => {
  const {t} = useTranslation();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Support Team',
      lastMessage: 'How can I help you today?',
      time: '2:30 PM',
      unread: 2,
    },
    {
      id: '2',
      name: 'John Farmer',
      lastMessage: 'Thanks for the tips!',
      time: 'Yesterday',
    },
  ];

  const messages: Message[] = [
    {id: '1', text: 'Hello! How can I help you?', sender: 'other', time: '2:25 PM'},
    {id: '2', text: 'I need help with soil pH', sender: 'me', time: '2:26 PM'},
    {id: '3', text: 'Sure! What seems to be the issue?', sender: 'other', time: '2:27 PM'},
  ];

  const sendMessage = () => {
    if (!messageText.trim()) return;
    setMessageText('');
  };

  if (selectedChat) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedChat(null)}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.chatName}>Support Team</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  item.sender === 'me' && styles.myMessageText,
                ]}>
                {item.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  item.sender === 'me' && styles.myMessageTime,
                ]}>
                {item.time}
              </Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder={t('typeMessage')}
            placeholderTextColor={colors.text.disabled}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('messages')}</Text>
      </View>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => setSelectedChat(item.id)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
                {item.unread && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerText: {
    ...typography.h2,
    color: colors.primary.main,
  },
  chatItem: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.background.default,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    ...typography.h4,
    color: colors.text.white,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chatName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
  },
  chatTime: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  lastMessage: {
    ...typography.body2,
    color: colors.text.secondary,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: colors.primary.main,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    marginLeft: spacing.sm,
  },
  unreadText: {
    ...typography.caption,
    color: colors.text.white,
    fontWeight: '600',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    ...typography.h3,
    color: colors.primary.main,
    marginRight: spacing.md,
  },
  messagesList: {
    padding: spacing.md,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  myMessage: {
    backgroundColor: colors.primary.main,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: colors.background.paper,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  myMessageText: {
    color: colors.text.white,
  },
  messageTime: {
    ...typography.caption,
    color: colors.text.secondary,
    fontSize: 10,
  },
  myMessageTime: {
    color: colors.text.white,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background.default,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    ...typography.body1,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    marginRight: spacing.sm,
  },
  sendButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  sendButtonText: {
    ...typography.button,
    color: colors.text.white,
  },
});

