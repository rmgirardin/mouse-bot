const ships = [

    {
        "name": "Ahsoka Tano's Jedi Starfighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Light Side", "Attacker", "Galactic Republic", "Jedi"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_jedi_fighter_ahsoka.png"
    },

    {
        "name": "Anakin's Eta-2 Starfighter",
        "ships": ["1-B"],
        "faction": ["Light Side", "Attacker", "Jedi", "Galactic Republic"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_jedi_fighter_anakin.png"
    },

    {
        "name": "B-28 Extinction-class Bomber",
        "light": ["6-C"],
        "faction": ["Dark Side", "Tank", "Sith"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_b28extinctionclassbomber.png"
    },

    {
        "name": "Biggs Darklighter's X-wing",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet"],
        "faction": ["Light Side", "Tank", "Rebel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_xwing_red3.png"
    },

    {
        "name": "Bistan's U-wing",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["2-C"],
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Support", "Rebel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_uwing.png"
    },

    {
        "name": "Cassian's U-wing",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["cantina", "guild events"],
        "faction": ["Light Side", "Support", "Rebel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_uwing_hero.png"
    },

    {
        "name": "Chimaera",
        "nickname": ["chimera"],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Dark Side", "Capital Ship", "Empire"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_chimaera.png"
    },

    {
        "name": "Clone Sergeant's ARC-170",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "ships": ["1-A"],
        "faction": ["Light Side", "Tank", "Clone Trooper", "Galactic Republic"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_arc170.png"
    },

    {
        "name": "Endurance",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Light Side", "Capital Ship", "Galactic Republic", "Jedi"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_venator.png"
    },

    {
        "name": "Executrix",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Dark Side", "Capital Ship", "Empire"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_stardestroyer.png"
    },

    {
        "name": "First Order SF TIE Fighter",
        "nickname": ["FOSFTF"],
        "dark": [],
        "cantina": [],
        "shops": ["guild shop"],
        "faction": ["Dark Side", "Attacker", "First Order"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_fosf_tie_fighter.png"
    },

    {
        "name": "First Order TIE Fighter",
        "nickname": ["FOTF"],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Dark Side", "Attacker", "First Order"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_firstorder_tiefighter.png"
    },

    {
        "name": "Gauntlet Starfighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["4-A"],
        "shops": ["fleet", "guild events"],
        "faction": ["Dark Side", "Support", "Empire"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_gauntlet.png"
    },

    {
        "name": "Geonosian Soldier's Starfighter",
        "light": ["9-D"],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Dark Side", "Attacker", "Geonosian", "Separatist"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_geonosis_fighter_soldier.png"
    },

    {
        "name": "Geonosian Spy's Starfighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Dark Side", "Attacker", "Geonosian", "Separatist"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_geonosis_fighter_spy.png"
    },

    {
        "name": "Ghost",
        "light": [],
        "dark": ["9-C"],
        "cantina": [],
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Attacker", "Phoenix", "Rebel", "Cargo Ship"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_ghost.png"
    },

    {
        "name": "Han's Millennium Falcon",
        "nickname": ["milf", "hmf"],
        "faction": ["Light Side", "Attacker", "Rebel", "Scoundrel", "Cargo Ship"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_mfalcon.png"
    },

    {
        "name": "Home One",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Light Side", "Capital Ship", "Rebel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_moncalamarilibertycruiser.png"
    },

    {
        "name": "Hound's Tooth",
        "light": ["8-D"],
        "faction": ["Dark Side", "Cargo Ship", "Scoundrel", "Bounty Hunters", "Tank"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_houndstooth.png"
    },

    {
        "name": "IG-2000",
        "light": ["6-E"],
        "faction": ["Dark Side", "Droid", "Scoundrel", "Bounty Hunters", "Attacker"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_ig2000.png"
    },

    {
        "name": "Imperial TIE Fighter",
        "nickname": ["ITF"],
        "dark": [],
        "cantina": [],
        "ships": ["1-C"],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Dark Side", "Attacker", "Empire"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_tiefighter.png"
    },

    {
        "name": "Jedi Consular's Starfighter",
        "light": [],
        "dark": ["8-B"],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Light Side", "Support", "Galactic Republic", "Jedi"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_jedi_fighter.png"
    },

    {
        "name": "Kylo Ren's Command Shuttle",
        "light": ["9-A"],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Dark Side", "Support", "First Order"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_upsilon_shuttle_kylo.png"
    },

    {
        "name": "Lando's Millennium Falcon",
        "nickname": ["yando", "lmf"],
        "ships": ["1-D"],
        "faction": ["Light Side", "Attacker", "Scoundrel", "Cargo Ship"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_mil_fal_pristine.png"
    },

    {
        "name": "Rey's Millennium Falcon",
        "nickname": ["rmf"],
        "dark": ["5-D"],
        "faction": ["Light Side", "Attacker", "Resistance", "Cargo Ship"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_mfalcon_ep7.png"
    },

    {
        "name": "Phantom II",
        "light": [],
        "dark": ["9-D"],
        "cantina": [],
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Attacker", "Phoenix", "Rebel", "Cargo Ship"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_phantom2.png"
    },

    {
        "name": "Plo Koon's Jedi Starfighter",
        "light": [],
        "dark": [],
        "cantina": ["7-F"],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Light Side", "Support", "Galactic Republic", "Jedi"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_jedi_fighter_bladeofdorin.png"
    },

    {
        "name": "Poe Dameron's X-wing",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["3-A"],
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Attacker", "Resistance"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_xwing_blackone.png"
    },

    {
        "name": "Resistance X-wing",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["1-E"],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Light Side", "Support", "Resistance"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_xwing_resistance.png"
    },

    {
        "name": "Rex's ARC-170",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Tank", "Clone Trooper", "Galactic Republic"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_arc170_02.png"
    },

    {
        "name": "Scimitar",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["3-D"],
        "shops": ["fleet", "guild events"],
        "faction": ["Dark Side", "Support", "Sith"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_sithinfiltrator.png"
    },

    {
        "name": "Sith Fighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": [],
        "ships": ["3-E"],
        "faction": ["Dark Side", "Attacker", "Sith"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_sithfighter.png"
    },

    {
        "name": "Slave I",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["2-B"],
        "shops": ["fleet"],
        "faction": ["Dark Side", "Attacker", "Scoundrel", "Cargo Ship", "Bounty Hunters"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_slave1.png"
    },

    {
        "name": "Sun Fac's Geonosian Starfighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["2-A"],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Dark Side", "Tank", "Geonosian", "Separatist"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_geonosis_fighter_sunfac.png"
    },

    {
        "name": "TIE Advanced x1",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["4-B"],
        "shops": ["fleet"],
        "faction": ["Dark Side", "Attacker", "Empire", "Sith"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_tieadvanced.png"
    },

    {
        "name": "TIE Reaper",
        "light": ["9-B"],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Dark Side", "Support", "Empire"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_tiereaper.png"
    },

    {
        "name": "TIE Silencer",
        "light": [],
        "dark": [],
        "cantina": ["3-F"],
        "shops": [],
        "faction": ["Dark Side", "Attacker", "First Order"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_tie_silencer.png"
    },

    {
        "name": "Umbaran Starfighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "ships": ["3-B"],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Light Side", "Tank", "Clone Trooper", "Galactic Republic"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_umbaran_star_fighter.png"
    },

    {
        "name": "Wedge Antilles's X-wing",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["fleet", "galactic war", "guild events"],
        "faction": ["Light Side", "Attacker", "Rebel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_xwing_red2.png"
    },

    {
        "name": "Xanadu Blood",
        "light": ["8-B"],
        "faction": ["Dark Side", "Scoundrel", "Bounty Hunters", "Support"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_xanadublood.png"
    }

];

module.exports = ships;
