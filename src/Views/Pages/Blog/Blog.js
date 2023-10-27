import React from 'react';
import ReactPlayer from 'react-player';
import BLog from '../../../access/blog.mp4';
function Blog() {
    return (
        <div>
            <div>
                <div>
                    <ReactPlayer
                        url={BLog} // Thay đổi URL bằng URL của video bạn muốn nhúng
                        controls={true} // Hiển thị thanh điều khiển
                        width="640px" // Điều chỉnh kích thước video
                        height="360px"
                    />
                </div>
            </div>
        </div>
    );
}

export default Blog;
