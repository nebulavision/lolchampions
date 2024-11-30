export default class Champion{
    constructor(champion) {
        this.name = champion.name;
        this.image = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.image.full}`;
        this.title = champion.title;
        this.description = champion.blurb;
        this.stats = champion.stats;
        this.tags = champion.tags;
    }
}