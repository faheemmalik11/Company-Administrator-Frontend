import moment from"moment";

export const dateFormat = (body: string) => {
    const date = moment(body).format("M/D/YYYY");
    return date;
}