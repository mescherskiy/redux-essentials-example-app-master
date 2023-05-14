import React, { useMemo } from "react";
//import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Spinner } from "../../components/Spinner"
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
// import { fetchPosts, selectPostById, selectPostIds } from "./postsSlice";
import { useGetPostsQuery } from "../api/apiSlice";

import classNames from "classnames";

let PostExcerpt = ({ post }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}

// PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {

    // const dispatch = useDispatch()

    // const orderedPostIds = useSelector(selectPostIds)

    // const postStatus = useSelector(state => state.posts.status)
    // const error = useSelector(state => state.posts.error)

    // useEffect(() => {
    //     if (postStatus === "idle") {
    //         dispatch(fetchPosts())
    //     }
    // }, [postStatus, dispatch])

    const {
        data: posts = [],
        isLoading,
        isSuccess,
        isFetching,
        isError,
        error,
        refetch
    } = useGetPostsQuery()

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    let content

    // if (postStatus === "loading") {
    //     content = <Spinner text="Loading..." />
    // } else if (postStatus === "succeeded") {
    //     content = orderedPostIds.map(postId => (
    //         <PostExcerpt key={postId} postId={postId} />
    //     ))
    // } else if (postStatus === "failed") {
    //     content = <div>{error}</div>
    // }

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
        const containerClassname = classNames("posts-container", {
            disabled: isFetching
        })
        content = <div className={containerClassname}>{renderedPosts}</div>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }


    return (
        <section className="posts-list">
            <h2>Posts</h2>
            <button onClick={refetch}>Refetch Posts</button>
            {content}
        </section>
    )
}