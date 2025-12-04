import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/Card';
import {Avatar, Badge, EmojiIcon} from '@components';
import {colors, typography, spacing} from '@theme';
import {format} from 'date-fns';

interface Post {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  image?: string;
  liked?: boolean;
}

export const CommunityScreen: React.FC = () => {
  const {t} = useTranslation();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userName: 'John Farmer',
      content: 'Great harvest this season! The new irrigation system is working perfectly. 🌾',
      likes: 24,
      comments: 5,
      shares: 3,
      time: '2 hours ago',
      liked: false,
    },
    {
      id: '2',
      userName: 'Marie Green',
      content: 'Sharing my experience with organic composting. It has improved my soil quality significantly! 🌱',
      likes: 18,
      comments: 8,
      shares: 2,
      time: '5 hours ago',
      liked: true,
    },
    {
      id: '3',
      userName: 'David K.',
      content: 'Just finished planting my new crop rotation. Excited to see the results! 💚',
      likes: 32,
      comments: 12,
      shares: 7,
      time: '1 day ago',
      liked: false,
    },
  ]);

  const toggleLike = (id: string) => {
    setPosts(
      posts.map(post =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>{t('community')}</Text>
          <Text style={styles.headerSubtext}>{t('connectWithFarmers')}</Text>
        </View>
        <TouchableOpacity style={styles.createButton}>
          <EmojiIcon emoji="✏️" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Card variant="elevated" style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <Avatar name={item.userName} size={48} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{item.content}</Text>

            {/* Post Image Placeholder */}
            {item.image && (
              <View style={styles.imagePlaceholder}>
                <EmojiIcon emoji="🖼️" size={40} />
                <Text style={styles.imageText}>{t('image')}</Text>
              </View>
            )}

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleLike(item.id)}>
                <EmojiIcon
                  emoji={item.liked ? '❤️' : '🤍'}
                  size={20}
                />
                <Text
                  style={[
                    styles.actionText,
                    item.liked && styles.actionTextActive,
                  ]}>
                  {item.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <EmojiIcon emoji="💬" size={20} />
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <EmojiIcon emoji="📤" size={20} />
                <Text style={styles.actionText}>{item.shares}</Text>
              </TouchableOpacity>
              <View style={styles.actionSpacer} />
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>{t('share')}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <EmojiIcon emoji="👥" size={64} />
            <Text style={styles.emptyText}>{t('noPostsYet')}</Text>
            <Text style={styles.emptySubtext}>{t('beFirstToPost')}</Text>
          </View>
        }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerText: {
    ...typography.h2,
    color: colors.primary.main,
    marginBottom: spacing.xs,
    fontWeight: '800',
  },
  headerSubtext: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.md,
  },
  postCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  postTime: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  postContent: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  imageText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
    gap: spacing.xs,
  },
  actionText: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  actionTextActive: {
    color: colors.error.main,
  },
  actionSpacer: {
    flex: 1,
  },
  shareButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.primary.light + '20',
  },
  shareButtonText: {
    ...typography.caption,
    color: colors.primary.main,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.body2,
    color: colors.text.secondary,
  },
});

