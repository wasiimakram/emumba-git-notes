export const formatTimeDifference = (createdAt: string): string => {
    const givenDate = new Date(createdAt);
    const currentDate = new Date();

    const timeDifferenceInMilliseconds =
        currentDate.getTime() - givenDate.getTime();
    const hoursDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 0) {
        return `${daysDifference} ${daysDifference === 1 ? "Day ago" : "Days ago"}`;
    } else if (hoursDifference > 0) {
        return `${hoursDifference} ${hoursDifference === 1 ? "Hour ago" : "Hours ago"}`;
    } else {
        return "Just Now";
    }
};
