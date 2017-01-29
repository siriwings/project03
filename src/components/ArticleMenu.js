import React, {PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
//import {ArticleMenu} from 'components';

import TimeAgo from 'react-timeago';


const ArticleMenu = ({
    data
    , index
    , onPublish
    , handleTouchTap
    , handleRequestClose
    , open
    , anchorEl
    , onRemove
    , onABC
}) => (
    <div>
        <Card className="post">
            {data.publish ?<h1> tr</h1> :<h1> f</h1>}
            <CardHeader
                title={data.writer}/>
            <TimeAgo date={data.date.created}/>
            <div>
                <RaisedButton
                    onTouchTap={handleTouchTap}
                    onClick={() => {
                        onABC(index, data._id);
                    }}
                    label="Click Me!"
                />
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={handleRequestClose}
                >
                    {data.publish ?<h1> tr</h1> :<h1> f</h1>}
                    <Menu>
                        {   //data.publish 상태 변화에 따른 처리
                            data.publish ?
                                (<MenuItem value={true}
                                           primaryText="Disabled"
                                           onClick={
                                               () => {
                                                   handleRequestClose();
                                                   onPublish();
                                               }}
                                />) :
                                (<MenuItem value={false}
                                           primaryText="Published"
                                           onClick={
                                               () => {
                                                   handleRequestClose();
                                                   onPublish();
                                               }}
                                />)
                        }
                        <Link to={'/edit'}><MenuItem>Edit</MenuItem></Link>
                        <MenuItem onClick={() => {
                            handleRequestClose();
                            onRemove();
                        }}>Remove</MenuItem>
                    </Menu>
                </Popover>
            </div>
            <CardText>
                {data.contents}
            </CardText>
        </Card>
    </div>
);
/*
 Article.propTypes = {
 data: PropTypes.object,
 //ownership prop  은 해당 메모가 자신의 메모인지 아닌지 여부를 확인하는 값
 ownership: PropTypes.bool
 };
 Article.defaultProps = {
 data: {
 _id: 'id1234567890',
 writer: 'Writer',
 contents: 'Contents',
 is_edited: false,
 date: {
 edited: new Date(),
 created: new Date()
 },
 starred: []
 },
 ownership: true
 }
 */

export default ArticleMenu;