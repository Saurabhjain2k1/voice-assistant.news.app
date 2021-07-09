import React, { useState, useEffect, createRef } from 'react'
import { Card, CardContent, CardMedia, CardActions, CardActionArea, Button, Typography, Link } from "@material-ui/core";

import useStyles from './style'
import classNames from "classnames";
import style from './style';
const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
    const classes = useStyles()
    const [elRefs, setElRefs] = useState([]);

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 10)

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])
    useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs]);

    return (
        <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)} >
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://www.stefanmisaras.com/wp-content/uploads/2013/02/what-is-really-news-today.jpg'} />
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
                </div>
                <Typography className={classes.title} variant='h6' >{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions} >
                <Button size='small' href={url} target="_blank" color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{i + 1}</Typography>
            </CardActions>
        </Card>
    )

}

export default NewsCard
