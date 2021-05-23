export class Game {
    constructor(
        name,
        releaseDate,
        description = "",
        genres = [],
        developer = ""
    ) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.description = description;
        this.genres = genres;
        this.developer = developer;
    }

    get name() {
        return this.name;
    }

    get releaseDate() {
        return this.releaseDate;
    }

    get description() {
        return this.description;
    }

    get genres() {
        return this.genres;
    }

    get developer() {
        return this.developer;
    }

    set name(value) {
        this.name = value;
    }

    set releaseDate(value) {
        this.releaseDate = value;
    }

    set description(value) {
        this.description = value;
    }

    set genres(value) {
        this.genres = value;
    }

    set developer(value) {
        this.developer = value;
    }

    get gameJson() {
        return {
            name: this.name,
            releaseDate: this.releaseDate,
            description: this.description,
            genres: this.genres,
            developer: this.developer,
        };
    }
}
