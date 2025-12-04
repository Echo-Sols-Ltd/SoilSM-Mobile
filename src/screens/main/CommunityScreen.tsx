import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/Card';
import {colors, typography, spacing} from '@theme';

interface Post {
  id: string;
  userName: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
}

export const CommunityScreen: React.FC = () => {
  const {t} = useTranslation();
  
  const posts: Post[] = [
    {
      id: '1',
      userName: 'John Farmer',
      content: 'Great harvest this season! The new irrigation system is working perfectly.',
      likes: 24,
      comments: 5,
    },
    {
      id: '2',
      userName: 'Marie Green',
      content: 'Sharing my experience with organic composting. It has improved my soil quality significantly!',
      likes: 18,
      comments: 8,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('community')}</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {posts.map(post => (
          <Card key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {post.userName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.userName}>{post.userName}</Text>
            </View>
            {post.image && (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>Image</Text>
              </View>
            )}
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>👍 {post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>💬 {post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>{t('share')}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  postCard: {
    marginBottom: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    ...typography.h4,
    color: colors.text.white,
  },
  userName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '600',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  imageText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  postContent: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  actionButton: {
    paddingVertical: spacing.xs,
  },
  actionText: {
    ...typography.body2,
    color: colors.primary.main,
  },
});

