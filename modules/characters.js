const characters = [

    {
        name: "Aayla Secura",
        cantina: ["5-B"],
        shops: ["guild"],
        faction: ["Light Side","Support","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_aaylasecura.png"
    },

    {
        name: "Admiral Ackbar",
        shops: ["arena","fleet"],
        faction: ["Light Side","Support","Fleet Commander","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ackbaradmiral.png"
    },

    {
        name: "Ahsoka Tano",
        light: ["5-D"],
        dark: ["4-C"],
        shops: ["cantina","fleet"],
        faction: ["Light Side","Attacker","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ahsoka.png"
    },

    {
        name: "Ahsoka Tano (Fulcrum)",
        shops: ["fleet"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ahsokaadult.png"
    },

    {
        name: "Asajj Ventress",
        shops: ["arena"],
        faction: ["Dark Side","Support","Nightsister","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ventress.png"
    },

    {
        name: "B2 Super Battle Droid",
        cantina: ["6-D"],
        shops: ["guild"],
        faction: ["Dark Side","Tank","Droid","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_b2.png"
    },

    {
        name: "Barriss Offee",
        dark: ["5-C","5-E","8-A"],
        cantina: ["6-A"],
        shops: ["guild"],
        faction: ["Light Side","Healer","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_barriss_light.png"
    },

    {
        name: "Baze Malbus",
        light: ["9-C"],
        shops: ["guild events"],
        faction: ["Light Side","Tank","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_bazemalbus.png"
    },

    {
        name: "BB-8",
        faction: ["Light Side","Support","Droid","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_bb8.png"
    },

    {
        name: "Biggs Darklighter",
        dark: ["4-A"],
        cantina: ["3-G"],
        shops: ["galactic war","fleet","guild events"],
        faction: ["Light Side","Support","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_rebelpilot_biggs.png"
    },

    {
        name: "Bistan",
        shops: ["cantina","guild events","fleet"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_bistan.png"
    },

    {
        name: "Boba Fett",
        light: ["8-A"],
        dark: ["2-B","4-E"],
        shops: ["cantina","fleet"],
        faction: ["Dark Side","Attacker","Bounty Hunter","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_bobafett.png"
    },

    {
        name: "Bodhi Rook",
        shops: ["galactic war","guild events"],
        faction: ["Light Side","Support","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_bodhi.png"
    },

    {
        name: "Cad Bane",
        shops: ["galactic war"],
        faction: ["Dark Side","Support","Bounty Hunter","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_cadbane.png"
    },

    {
        name: "Captain Han Solo",
        cantina: ["7-D"],
        faction: ["Light Side","Support","Rebel","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_hoth_han.png"
    },

    {
        name: "Captain Phasma",
        shops: ["galactic war"],
        faction: ["Dark Side","Support","First Order","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_phasma.png"
    },

    {
        name: "Cassian Andor",
        shops: ["arena","guild events"],
        faction: ["Light Side","Support","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_cassian.png"
    },

    {
        name: 'CC-2224 "Cody"', // eslint-disable-line quotes
        shops: ["guild","fleet"],
        faction: ["Light Side","Attacker","Clone Trooper","Galactic Republic","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperclone_cody.png"
    },

    {
        name: "Chief Chirpa",
        cantina: ["5-D"],
        faction: ["Light Side","Support","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_chirpa.png"
    },

    {
        name: "Chief Nebit",
        shops: ["arena"],
        faction: ["Light Side","Tank","Jawa"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jawa_nebit.png"
    },

    {
        name: "Chirrut Îmwe",
        shops: ["guild events","fleet"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_chirrut.png"
    },

    {
        name: "Chopper",
        shops: ["cantina","guild events"],
        faction: ["Light Side","Support","Droid","Phoenix","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_chopper.png"
    },

    {
        name: "Clone Sergeant - Phase I",
        light: ["5-E"],
        dark: ["1-B","3-E"],
        shops: ["guild","fleet"],
        faction: ["Light Side","Attacker","Clone Trooper","Galactic Republic","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperclonegreen.png"
    },

    {
        name: "Clone Wars Chewbacca",
        light: ["3-E"],
        dark: ["2-C"],
        cantina: ["1-C","5-G"],
        faction: ["Light Side","Tank","Galactic Republic","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_chewbacca.png"
    },

    {
        name: "Colonel Starck",
        shops: ["guild"],
        faction: ["Dark Side","Empire","Imperial Trooper","Support"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_colonel_stark.png"
    },

    {
        name: "Commander Luke Skywalker",
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_lukebespin.png"
    },

    {
        name: "Coruscant Underworld Police",
        shops: ["arena"],
        faction: ["Light Side","Support","Galactic Republic"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_coruscantpolice.png"
    },

    {
        name: "Count Dooku",
        light: ["1-C"],
        dark: ["1-C"],
        cantina: ["6-G"],
        faction: ["Dark Side","Support","Separatist","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_dooku.png"
    },

    {
        name: 'CT-21-0408 "Echo"', // eslint-disable-line quotes
        shops: ["guild","fleet"],
        faction: ["Light Side","Support","Clone Trooper","Galactic Republic","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperclone_echo.png"
    },

    {
        name: 'CT-5555 "Fives"', // eslint-disable-line quotes
        light: ["4-F"],
        dark: ["2-D"],
        shops: ["cantina","fleet"],
        faction: ["Light Side","Tank","Clone Trooper","Galactic Republic","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperclone_fives.png"
    },

    {
        name: 'CT-7567 "Rex"', // eslint-disable-line quotes
        shops: ["guild","fleet"],
        faction: ["Light Side","Support","Clone Trooper","Galactic Republic","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperclone_rex.png"
    },

    {
        name: "Darth Maul",
        shops: ["guild","fleet"],
        faction: ["Dark Side","Attacker","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_maul.png"
    },

    {
        name: "Darth Nihilus",
        dark: ["9-A"],
        faction: ["Dark Side","Support","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nihilus.png"
    },

    {
        name: "Darth Sidious",
        shops: ["arena"],
        faction: ["Dark Side","Attacker","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_sidious.png"
    },

    {
        name: "Darth Vader",
        shops: ["fleet"],
        faction: ["Dark Side","Attacker","Empire","Human","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_vader.png"
    },

    {
        name: "Dathcha",
        light: ["3-B","3-F"],
        cantina: ["2-G"],
        shops: ["galactic war"],
        faction: ["Light Side","Support","Jawa"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jawa_dathcha.png"
    },

    {
        name: "Death Trooper",
        cantina: ["8-A"],
        faction: ["Dark Side","Attacker","Empire","Imperial Trooper"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperdeath.png"
    },

    {
        name: "Dengar",
        shops: ["guild"],
        faction: ["Dark Side","Attacker","Bounty Hunter","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_dengar.png"
    },

    {
        name: "Director Krennic",
        light: ["9-D"],
        faction: ["Dark Side","Support","Empire","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_krennic.png"
    },

    {
        name: "Eeth Koth",
        shops: ["arena"],
        faction: ["Light Side","Support","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_eethkoth.png"
    },

    {
        name: "Emperor Palpatine",
        faction: ["Dark Side","Support","Empire","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_palpatineemperor.png"
    },

    {
        name: "Ewok Elder",
        light: ["2-C"],
        dark: ["8-C"],
        shops: ["guild"],
        faction: ["Light Side","Healer","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_chief.png"
    },

    {
        name: "Ewok Scout",
        light: ["1-A"],
        dark: ["8-D","9-B"],
        faction: ["Light Side","Attacker","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_scout.png"
    },

    {
        name: "Ezra Bridger",
        cantina: ["2-B"],
        shops: ["guild events","fleet"],
        faction: ["Light Side","Attacker","Jedi","Phoenix","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ezra_s3.png"
    },

    {
        name: "Finn",
        light: ["7-A"],
        cantina: ["3-E","5-C"],
        shops: ["guild"],
        faction: ["Light Side","Tank","Human","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_finnjakku.png"
    },

    {
        name: "First Order Officer",
        shops: ["cantina"],
        faction: ["Dark Side","Support","First Order","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_firstorderofficer.png"
    },

    {
        name: "First Order SF TIE Pilot",
        faction: ["Attacker","Dark Side","First Order"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_firstorder_pilot.png"
    },

    {
        name: "First Order Stormtrooper",
        light: ["2-B","9-A"],
        dark: ["2-A"],
        faction: ["Dark Side","Tank","First Order","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_firstordertrooper.png"
    },

    {
        name: "First Order TIE Pilot",
        light: ["6-D"],
        dark: ["6-B"],
        shops: ["fleet"],
        faction: ["Dark Side","Attacker","First Order","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_firstordertiepilot.png"
    },

    {
        name: "Gamorrean Guard",
        shops: ["guild"],
        faction: ["Dark Side","Tank","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_gamorreanguard.png"
    },

    {
        name: "Gar Saxon",
        cantina: ["8-E"],
        shops: ["guild events"],
        faction: ["Dark Side","Tank","Empire"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_gar_saxon.png"
    },

    {
        name: 'Garazeb "Zeb" Orrelios', // eslint-disable-line quotes
        shops: ["galactic war","guild events"],
        faction: ["Light Side","Tank","Phoenix","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_zeb_s3.png"
    },

    {
        name: "General Grievous",
        shops: ["fleet","shard"],
        faction: ["Dark Side","Attacker","Droid","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_grievous.png"
    },

    {
        name: "General Kenobi",
        faction: ["Light Side","Tank","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_obiwangeneral.png"
    },

    {
        name: "General Veers",
        light: ["4-C","6-C"],
        dark: ["6-D"],
        faction: ["Dark Side","Support","Empire","Imperial Trooper"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_veers.png"
    },

    {
        name: "Geonosian Soldier",
        cantina: ["1-A"],
        shops: ["fleet"],
        faction: ["Dark Side","Attacker","Geonosian","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_geonosian_soldier.png"
    },

    {
        name: "Geonosian Spy",
        cantina: ["4-D"],
        shops: ["fleet"],
        faction: ["Dark Side","Attacker","Geonosian","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_geonosian_spy.png"
    },

    {
        name: "Grand Admiral Thrawn",
        faction: ["Dark Side","Support","Empire","Fleet Commander"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_thrawn.png"
    },

    {
        name: "Grand Master Yoda",
        faction: ["Light Side","Support","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_yodagrandmaster.png"
    },

    {
        name: "Grand Moff Tarkin",
        shops: ["arena","fleet"],
        faction: ["Dark Side","Support","Empire","Fleet Commander","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_tarkinadmiral.png"
    },

    {
        name: "Greedo",
        shops: ["arena"],
        faction: ["Dark Side","Attacker","Bounty Hunter","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_greedo.png"
    },

    {
        name: "Han Solo",
        faction: ["Light Side","Attacker","Rebel","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_han.png"
    },

    {
        name: "Hera Syndulla",
        cantina: ["1-F"],
        shops: ["guild events"],
        faction: ["Light Side","Support","Phoenix","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_hera_s3.png"
    },

    {
        name: "Hermit Yoda",
        shops: ["guild events"],
        faction: ["Light Side","Support","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_yodahermit.png"
    },

    {
        name: "HK-47",
        shops: ["arena"],
        faction: ["Dark Side","Support","Droid"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_hk47.png"
    },

    {
        name: "Hoth Rebel Scout",
        light: ["8-B"],
        dark: ["6-A"],
        shops: ["cantina","guild events"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_rebelhothscout.png"
    },

    {
        name: "Hoth Rebel Soldier",
        dark: ["3-B"],
        shops: ["guild events"],
        faction: ["Light Side","Support","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_rebelhoth.png"
    },

    {
        name: "IG-100 MagnaGuard",
        dark: ["6-E"],
        cantina: ["3-C"],
        shops: ["guild"],
        faction: ["Dark Side","Tank","Droid","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_magnaguard.png"
    },

    {
        name: "IG-86 Sentinel Droid",
        light: ["4-D"],
        dark: ["2-F"],
        cantina: ["4-E"],
        shops: ["galactic war"],
        faction: ["Dark Side","Attacker","Droid"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ig86.png"
    },

    {
        name: "IG-88",
        shops: ["arena"],
        faction: ["Dark Side","Attacker","Bounty Hunter","Droid","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ig88.png"
    },

    {
        name: "Ima-Gun Di",
        light: ["7-C"],
        dark: ["5-A"],
        cantina: ["7-E"],
        shops: ["guild"],
        faction: ["Light Side","Support","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_imagundi.png"
    },

    {
        name: "Imperial Probe Droid",
        faction: ["Dark Side","Droid","Empire","Support"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_probedroid.png"
    },

    {
        name: "Imperial Super Commando",
        cantina: ["8-D"],
        faction: ["Dark Side","Attacker","Empire"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_imperial_super_commando.png"
    },

    {
        name: "Jawa",
        light: ["6-B"],
        dark: ["4-F"],
        cantina: ["2-D"],
        faction: ["Light Side","Attacker","Jawa"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jawa_jawa.png"
    },

    {
        name: "Jawa Engineer",
        shops: ["guild"],
        faction: ["Light Side","Healer","Jawa"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jawa_engineer.png"
    },

    {
        name: "Jawa Scavenger",
        shops: ["cantina"],
        faction: ["Light Side","Support","Jawa"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jawa_scavenger.png"
    },

    {
        name: "Jedi Consular",
        light: ["1-B"],
        dark: ["1-D","3-C"],
        cantina: ["3-A","6-E"],
        shops: ["fleet"],
        faction: ["Light Side","Healer","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jedi_consular_03.png"
    },

    {
        name: "Jedi Knight Anakin",
        light: ["5-C"],
        dark: ["5-B","7-D"],
        cantina: ["7-G"],
        faction: ["Light Side","Attacker","Galactic Republic","Human","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_anakinknight.png"
    },

    {
        name: "Jedi Knight Guardian",
        dark: ["3-F"],
        shops: ["cantina"],
        faction: ["Light Side","Tank","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jedi_guardian_01.png"
    },

    {
        name: "Jyn Erso",
        shops: ["guild","guild events"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_jyn.png"
    },

    {
        name: "K-2SO",
        shops: ["galactic war","guild events"],
        faction: ["Light Side","Tank","Droid","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_k2so.png"
    },

    {
        name: "Kanan Jarrus",
        shops: ["arena","guild events"],
        faction: ["Light Side","Tank","Jedi","Phoenix","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_kanan_s3.png"
    },

    {
        name: "Kit Fisto",
        cantina: ["4-F"],
        shops: ["guild"],
        faction: ["Light Side","Attacker","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_kitfisto.png"
    },

    {
        name: "Kylo Ren",
        cantina: ["4-C","6-C"],
        shops: ["guild"],
        faction: ["Dark Side","Attacker","First Order","Human"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_kyloren.png"
    },

    {
        name: "Kylo Ren (Unmasked)",
        faction: ["Dark Side","First Order","Human","Tank"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_kylo_unmasked.png"
    },

    {
        name: "Lando Calrissian",
        cantina: ["1-E","5-F"],
        shops: ["guild events"],
        faction: ["Light Side","Attacker","Human","Rebel","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_landobespin.png"
    },

    {
        name: "Lobot",
        light: ["4-B","5-B"],
        faction: ["Light Side","Support","Human","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_lobot.png"
    },

    {
        name: "Logray",
        shops: ["guild"],
        faction: ["Light Side","Support","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_logray.png"
    },

    {
        name: "Luke Skywalker (Farmboy)",
        light: ["7-D"],
        cantina: ["1-B","5-A"],
        shops: ["guild","guild events"],
        faction: ["Light Side","Attacker","Human","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_luke_ep4.png"
    },

    {
        name: "Luminara Unduli",
        light: ["3-D","6-A"],
        dark: ["2-E"],
        shops: ["galactic war"],
        faction: ["Light Side","Attacker","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_luminara.png"
    },

    {
        name: "Mace Windu",
        light: ["2-E"],
        cantina: ["4-A"],
        shops: ["arena","fleet"],
        faction: ["Light Side","Tank","Fleet Commander","Galactic Republic","Human","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_macewindu.png"
    },

    {
        name: "Magmatrooper",
        shops: ["galactic war"],
        faction: ["Dark Side","Attacker","Empire","Human","Imperial Trooper"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperstorm_magma.png"
    },

    {
        name: "Mob Enforcer",
        shops: ["cantina"],
        faction: ["Dark Side","Tank","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_thug_female_01.png"
    },

    {
        name: "Mother Talzin",
        faction: ["Dark Side","Support","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nightsisters_talzin.png"
    },

    {
        name: "Nightsister Acolyte",
        cantina: ["2-A"],
        shops: ["guild"],
        faction: ["Dark Side","Attacker","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nightsister_acolyte.png"
    },

    {
        name: "Nightsister Initiate",
        shops: ["galactic war"],
        faction: ["Dark Side","Attacker","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nightsister_initiate.png"
    },

    {
        name: "Nightsister Spirit",
        faction: ["Dark Side","Attacker","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nightsisters_wraith.png"
    },

    {
        name: "Nightsister Zombie",
        faction: ["Dark Side","Tank","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nightsisters_zombie.png"
    },

    {
        name: "Nute Gunray",
        shops: ["arena"],
        faction: ["Dark Side","Attacker","Scoundrel","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nutegunray.png"
    },

    {
        name: "Obi-Wan Kenobi (Old Ben)",
        cantina: ["2-F","6-B"],
        shops: ["guild"],
        faction: ["Light Side","Tank","Human","Jedi","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_obiwanep4.png"
    },

    {
        name: "Old Daka",
        dark: ["4-B"],
        shops: ["cantina"],
        faction: ["Dark Side","Healer","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_daka.png"
    },

    {
        name: "Pao",
        shops: ["cantina","guild events"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_pao.png"
    },

    {
        name: "Paploo",
        cantina: ["3-D"],
        shops: ["guild"],
        faction: ["Light Side","Tank","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_paploo.png"
    },

    {
        name: "Plo Koon",
        dark: ["7-C"],
        cantina: ["4-G"],
        shops: ["fleet"],
        faction: ["Light Side","Tank","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_plokoon.png"
    },

    {
        name: "Poe Dameron",
        light: ["7-B"],
        dark: ["7-A"],
        shops: ["cantina","fleet"],
        faction: ["Light Side","Tank","Human","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_poe.png"
    },

    {
        name: "Poggle the Lesser",
        light: ["4-E","6-E"],
        shops: ["galactic war"],
        faction: ["Dark Side","Support","Geonosian","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_geonosian_poggle.png"
    },

    {
        name: "Princess Leia",
        shops: ["arena","guild events"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_leia_princess.png"
    },

    {
        name: "Qui-Gon Jinn",
        shops: ["cantina"],
        faction: ["Light Side","Support","Galactic Republic","Jedi"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_quigon.png"
    },

    {
        name: "R2-D2",
        faction: ["Light Side","Support","Droid","Galactic Republic","Rebel","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_astromech_r2d2.png"
    },

    {
        name: "Rebel Officer Leia Organa",
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_leiahoth.png"
    },

    {
        name: "Resistance Pilot",
        shops: ["galactic war","fleet"],
        faction: ["Light Side","Attacker","Human","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_resistancepilot.png"
    },

    {
        name: "Resistance Trooper",
        light: ["3-A"],
        dark: ["3-A"],
        shops: ["guild"],
        faction: ["Light Side","Attacker","Human","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_resistancetrooper.png"
    },

    {
        name: "Rey (Scavenger)",
        light: ["2-A"],
        dark: ["5-D","7-B"],
        shops: ["guild"],
        faction: ["Light Side","Attacker","Human","Resistance"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_reyjakku.png"
    },

    {
        name: "Royal Guard",
        light: ["1-D"],
        dark: ["5-F"],
        cantina: ["7-C"],
        shops: ["guild events"],
        faction: ["Dark Side","Tank","Empire"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_royalguard.png"
    },

    {
        name: "Sabine Wren",
        dark: ["1-A"],
        shops: ["guild events"],
        faction: ["Light Side","Attacker","Phoenix","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_sabine_s3.png"
    },

    {
        name: "Savage Opress",
        shops: ["arena"],
        faction: ["Dark Side","Attacker","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_savageopress.png"
    },

    {
        name: "Scarif Rebel Pathfinder",
        cantina: ["1-D"],
        shops: ["guild events","fleet"],
        faction: ["Light Side","Tank","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_rebel_scarif.png"
    },

    {
        name: "Shoretrooper",
        light: ["9-B"],
        faction: ["Dark Side","Tank","Empire","Imperial Trooper"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_troopershore.png"
    },

    {
        name: "Sith Assassin",
        cantina: ["8-C"],
        shops: ["guild"],
        faction: ["Dark Side","Attacker","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_sithassassin.png"
    },

    {
        name: "Sith Trooper",
        cantina: ["8-B"],
        faction: ["Dark Side","Tank","Sith"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_sithtrooper.png"
    },

    {
        name: "Snowtrooper",
        light: ["8-C"],
        cantina: ["7-B"],
        shops: ["guild"],
        faction: ["Dark Side","Attacker","Empire","Human","Imperial Trooper"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_troopersnow.png"
    },

    {
        name: "Stormtrooper",
        light: ["3-C","8-D"],
        dark: ["4-D"],
        shops: ["cantina","guild events"],
        faction: ["Dark Side","Tank","Empire","Imperial Trooper"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperstorm.png"
    },

    {
        name: "Stormtrooper Han",
        shops: ["arena","guild events"],
        faction: ["Light Side","Tank","Human","Rebel","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_trooperstorm_han.png"
    },

    {
        name: "Sun Fac",
        shops: ["guild","fleet"],
        faction: ["Dark Side","Tank","Geonosian","Separatist"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_geonosian_sunfac.png"
    },

    {
        name: "Talia",
        light: ["2-D","2-F"],
        cantina: ["1-G","5-E"],
        faction: ["Dark Side","Healer","Nightsister"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_nightsister_talia.png"
    },

    {
        name: "Teebo",
        light: ["4-A"],
        dark: ["3-D"],
        shops: ["galactic war"],
        faction: ["Light Side","Tank","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_teebo.png"
    },

    {
        name: "TIE Fighter Pilot",
        cantina: ["4-B"],
        shops: ["fleet"],
        faction: ["Dark Side","Attacker","Empire"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_tiepilot.png"
    },

    {
        name: "Tusken Raider",
        dark: ["6-C"],
        cantina: ["7-A"],
        shops: ["galactic war"],
        faction: ["Dark Side","Attacker","Tusken"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_tuskenraider.png"
    },

    {
        name: "Tusken Shaman",
        shops: ["guild","fleet"],
        faction: ["Dark Side","Healer","Tusken"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_tuskenshaman.png"
    },

    {
        name: "Ugnaught",
        shops: ["arena"],
        faction: ["Light Side","Support"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ugnaught.png"
    },

    {
        name: "URoRRuR'R'R",
        light: ["5-A","5-F"],
        faction: ["Dark Side","Support","Tusken"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_urorrurrr.png"
    },

    {
        name: "Veteran Smuggler Chewbacca",
        cantina: ["8-F"],
        faction: ["Light Side","Attacker","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_tfa_chewbacca.png"
    },

    {
        name: "Veteran Smuggler Han Solo",
        cantina: ["8-G"],
        faction: ["Light Side","Attacker","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_tfa_han.png"
    },

    {
        name: "Wampa",
        shops: ["guild events"],
        faction: ["Attacker","Dark Side"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_wampa.png"
    },

    {
        name: "Wedge Antilles",
        cantina: ["6-F"],
        shops: ["guild events","fleet"],
        faction: ["Light Side","Attacker","Rebel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_rebelpilot_wedge.png"
    },

    {
        name: "Wicket",
        faction: ["Light Side","Attacker","Ewok"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_ewok_wicket.png"
    },

    {
        name: "Zam Wesell",
        shops: ["guild","fleet"],
        faction: ["Dark Side","Attacker","Bounty Hunter","Scoundrel"],
        image: "https://swgoh.gg/static/img/assets/tex.charui_zamwesell.png"
    },

];

module.exports = characters;
