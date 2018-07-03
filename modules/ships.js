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
        "faction": ["Light Side", "Attacker", "Phoenix", "Rebel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_ghost.png"
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
        "name": "Imperial TIE Fighter",
        "nickname": ["ITF"],
        "dark": [],
        "cantina": [],
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
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": [],
        "faction": ["Light Side", "Attacker", "Scoundrel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_mil_fal_pristine.png"
    },

    {
        "name": "Millennium Falcon (Ep VII)",
        "light": [],
        "dark": ["5-D"],
        "cantina": [],
        "shops": [],
        "faction": ["Light Side", "Attacker", "Resistance"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_mfalcon_ep7.png"
    },

    {
        "name": "Phantom II",
        "light": [],
        "dark": ["9-D"],
        "cantina": [],
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Attacker", "Phoenix", "Rebel"],
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
        "shops": ["fleet", "guild events"],
        "faction": ["Light Side", "Attacker", "Resistance"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_xwing_blackone.png"
    },

    {
        "name": "Resistance X-wing",
        "light": [],
        "dark": [],
        "cantina": [],
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
        "shops": ["fleet", "guild events"],
        "faction": ["Dark Side", "Support", "Sith"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_sithinfiltrator.png"
    },

    {
        "name": "Slave I",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["fleet"],
        "faction": ["Dark Side", "Attacker", "Scoundrel"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_slave1.png"
    },

    {
        "name": "Sun Fac's Geonosian Starfighter",
        "light": [],
        "dark": [],
        "cantina": [],
        "shops": ["galactic war", "fleet", "guild events"],
        "faction": ["Dark Side", "Tank", "Geonosian", "Separatist"],
        "sImage": "https://swgoh.gg/static/img/assets/tex.charui_geonosis_fighter_sunfac.png"
    },

    {
        "name": "TIE Advanced x1",
        "light": [],
        "dark": [],
        "cantina": [],
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

];

module.exports = ships;
