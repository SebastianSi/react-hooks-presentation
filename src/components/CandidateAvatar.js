import React from "react"
import Avatar from "avataaars"

export default function CandidateAvatar(props) {
    let { height, width, topType, accessoriesType, hairColor, facialHairType, facialHairColor, clotheType, clotheColor, eyeType,
        eyebrowType, mouthType, skinColor } = props.data
    return (
        <Avatar
            style={{height, width}}
            avatarStyle='Circle'
            topType={topType}
            accessoriesType={accessoriesType}
            hairColor={hairColor}
            facialHairType={facialHairType}
            facialHairColor={facialHairColor || "Default"}
            clotheType={clotheType}
            clotheColor={clotheColor}
            eyeType={eyeType}
            eyebrowType={eyebrowType}
            mouthType={mouthType}
            skinColor={skinColor}
        />
    );
}
