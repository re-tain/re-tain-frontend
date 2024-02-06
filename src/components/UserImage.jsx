function UserImage({ src }) {
    if (!src) src = "/avatar-placeholder.png";
    return <img className="h-8 w-8 mr-1 rounded-full" src={src} alt="" />;
}

export default UserImage;
