import type { Video } from '../../lib'

import { Link } from '@solidjs/router'
import { Show } from 'solid-js'

import { Edit } from '../../icons/Edit'
import { getDateWithTimestamp, getTimestamp, store } from '../../lib'
import './VideoItem.css'

type VideoItemProps = {
  video: Video
  headingLevel: 'second' | 'third'
}

export function VideoItem(props: VideoItemProps) {
  return (
    <Link
      href={`/videos/${props.video.id}`}
      aria-label={props.video.title}
      class="video"
    >
      <img src={props.video.thumbnailUrl} alt="" class="video__thumbnail" />
      <img
        src={props.video.author.imageUrl}
        alt=""
        class="video__author-image"
      />

      <Show when={props.headingLevel === 'second'}>
        <h2 class="video__title">{props.video.title}</h2>
      </Show>

      <Show when={props.headingLevel === 'third'}>
        <h3 class="video__title">{props.video.title}</h3>
      </Show>

      <Link
        href={`/profiles/${props.video.author.id}`}
        class="video__author-fullname"
      >
        {props.video.author.fullname}
      </Link>
      <p class="video__views">
        <span>{props.video.views} views</span>
        <span>•</span>
        <span>{getDateWithTimestamp(getTimestamp(props.video.createdAt))}</span>
      </p>

      <Show when={store.user && store.user.id === props.video.author.id}>
        <Link
          class="video__edit"
          href={`/videos/${props.video.id}/edit`}
          aria-label="Edit video"
        >
          <Edit />
        </Link>
      </Show>
    </Link>
  )
}
