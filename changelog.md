## Changelog for HeroCreator
**v2.3.2.28** - 12/11/2017 - Aesica
 - Added the new Fire healing powers:  Warmth, Hearth, Smoldering, Nova Flare, Fiery Embrace
 - Added The Blazing archetype
 - Added The Blazing innate talent
 - Updated the advantages of several powers to reflect the most recent additions
 - Fixed Overdrive's description to state that it favors Endurance over Recovery
---
**v2.3.2.27** - 11/25/2017 - Aesica
 - Added the new Fire powers:  Fiery Will, Rise From the Ashes, Flame Prison, Incinerate, and Meteor Blaze.
 - Updated the various powers and advantages changed by the Fire revamp.
 - Updated The Inferno AT to reflect new progression path.
 - Added Icons for Moonstruck as well as the new Fire poewrs.
---
**v2.3.2.26** - 11/5/2017 - Aesica
 - Fixed some broken advantages
 - Fixed a flag on Thermal Reverb
 - Fixed Form of the Tiger to be lumped with Fighting Claws again, not Dual Blades
 - Added Moonstruck
---
**v2.3.1.25** - 9/7/2017 - Aesica
 - Added the new and updated existing Electricity powers to reflect the latest changes to the Electricity framework
 - Updated the Impulse AT's progression path
 - Fixed some minor bugs and typo nonsense
 - Updated several of the classes used to parse power data with a new framework that allows for more detailed parameters (range, cooldown, cast times, etc) as well as dynamically-generated tooltips (the old ones were static and had a lot of redundant things in them).  What this means is that you'll start to see more informative tooltips for powers using this new data system.  Powers not yet updated will show [Legacy data] in their tooltips, but should otherwise function fine.  Over time, more will be updated until everything is peachy.  Hopefully.
---
**v2.2.3.24** - 6/22/2017 - Aesica
 - Added Ego Form to Telepathy
 - Updated Master of the Mind to reflect its new status as an Ultimate ability
 - Added Dark Lariat to Darkness, although it's using the placeholder icon until whenever the next big set of power updates happens.
 - Added version displays below the main page title and to export data to hopefully make it easier for people to know which version they'er working with or, in the case of exports, to know which version the build they're looking at was made with.
 ---
**v2.2.2.23** - 6/22/2017 - Aesica
 - Added and updated powers to reflect the TK Blades changes
 - Added The Psychokinetic AT and innate
 - Added data for all the newest travel powers
 - Fixed a minor stat mixup in The Predator's innate
 - Specializations can now be reset properly via the logo-click reset feature
 - Swapped Shade Storm's placeholder icon for the real thing
 - Other minor fixes and changes
---
**v2.2.1.22** - 5/29/2017 - Aesica
 - Updated tooltips for all powers gated behind an unlock mechanism with where the unlock is obtained and (if applicable) how much it costs.  If I missed anything or got anything wrong on these, let me know.
 - Added Shade Storm.  Note that it's still using a placeholder icon; I'll add the proper icon sometime in the future when a bigger lump of new powers get added.
 - Added Phase Out and Upload to travel powers.
 - Updated the herpderp placeholder tooltips used by the variant travel powers.  Yeah I forgot about those, and I suppose "Help!  My feet are on fire!" or "This power will probably kill you" isn't too useful.  Okay, maybe the latter is, but you get the idea.
 - Assorted minor fixes nobody cares about but me. :3
---
**v2.2.0.21** - 5/6/2017 - Aesica
 - Added powers:   Aurora, Mental Impact
 - Updated powers/advantages to reflect recent changes:  Ebon Ruin, Holy Water, Illumination, Celestial Conduit
 - Added Dark Transfusion to The Void's progression list
 - Listed The Inventor as a reward from Foxbatcon
 - Fixed some bugs:  Missing Wall of Bullets on SMG Burst/Bullet Hail, fixed cost of Fractal Aegis & Showdown's advantages, etc.
 - Clicking on the "Herocreator" logo as a means to reset your build now lets you optionally reset only select parts 
 - Fixed Showdown's icon - it's been using a placeholder for too long now :3
 - Added more detailed tooltip info for a few more abilities, like dark transfusion
---
**v2.1.0.20** - 3/3/2017 - Aesica
 - Increased the maximum travel power and innate talent counts allowed by the engine from 61 to 3721.  This adds approximately total characters to the url size.
 - Added some checks to ensure (hopefully!) that existing builds are unaffected.
 - Added Tricolor Flight (hor/ver), Arcane Flight, Tricolor Superspeed (hor/ver), Frost Speed, Cold Snap Speed, Rainbow Acrobatics, Prism Athletics, Blazing Acrobatics, Scorching Athletics, and Rainbow Jump to the travel power list.  Not all icons are up to date yet, though.
 - Improved tooltips for all travel powers
 - Improved a few Energy Unlock tooltips as well.  Both forms and energy unlocks now display their relevant stats in the first line for easy identification.
---
**v2.0.0.19** - 2/25/2017 - Aesica
 - Updated powers to reflect the recent munitions and martial arts changes.
 - Added The Gunslinger AT and Innate.
 - Saved data (user prefs) now uses html5 storage instead of cookies.  Browsers that don't support html5 storage (omg it's 2017 please update) will fall back on cookies which only managed to store some of the data in the original Powerhouse.  Note that html5 storage is cleaner, more durable, easier to work with, and allows for a larger amount of data to be saved for future enhancements, such as...
 - Added the ability to load and save builds.  This feature is only available on devices that support html5 storage.
 - Updated tooltips for passives, forms, and blocks to provide more useful info.
 - Suppressed the google analytics code because I really don't have any interest in using it beyond page access counts.
 - Removed the google analytics submission option from the user preferences menu since it's no longer relevant.
 - Cleaned up the popup/selection windows, both in terms of aesthetics and internal redundancies.
 - Added the option to use any font available on your device (not just the presets) provided you know the name of it.
 - Modernized the preset font list by adding fonts commonly installed on windows machines while removing older, lesser-used fonts
 - Preset fonts now display in their native typeface for preview purposes.
 - Note:  I may remove the Lexia font in the future, so if you currently like it and use it, I suggest saving it to your computer so you can continue using it via the newly-added custom font feature.
 - Updated icons to use a single image file rather than 640+ different image files for significantly faster loading and better overall performance.
 - Updated the help section to cover the newer changes
 - Selected font now affects certain tabs that were previously unaffected.
 - Moving forward, there will be support (although limited) for keeping older builds up to date as new updates shuffle powers and frameworks around.
 - Resetting a role specialization or the mastery no longer also forces the stat specialization to reset.
 - Reorganized the file structure to something cleaner
 - Skinning a bear should now aggro every bears in a 40 yard radius.  It makes sense, you are actually skinning their best friend.
 - Squashed several other minor, insignificant bugs that nobody cares about. :D
---
12/10/2016 - Aesica
 - Added description to the Laser Sword framework (does anyone even read/use those?)
 - Updated descriptions for other frameworks to include the newer ATs
 - Updated the Power Armor framework changes (my bad on that!)
 - Updated The Invincible and The Automaton changes
---
12/8/2016 - Aesica
 - Added the Laser Sword framework.
 - Added the Cybernetic Warrior archtype.
 - Misc Minor fixes.
 - Sorry guys, builds broke again.  I'm going to need to fix the way data is organized in this thing to prevent this from happening in the future--specifically, every time the devs add or remove frameworksfs. :(
---
11/10/2016 - Aesica
 - Added the Witch archetype and new infernal powers associated with it.
 - Fixed several minor things involving tooltips, removed a few incorrect advantages, etc.
 - Premium ATs available from events now state which event they're obtained in plus other improvements.
 - Rebirth's icon matches the new green version seen ingame.  How boring. :(
 - A few other very minor things that I don't even remember, but I don't think they broke anything.  I hope. ^^

IMPORTANT NOTE
Adding new powers to frameworks all the time may break existing builds which use powers from said frameworks.  This is because the order the powers appear in is determined by their place in the data.  The data in a linked build's query string  also relies on a specific order in the data to display certain powers.

This has left me with the hard choice between making sure similar powers and similar tiers remain grouped together vs adding them to the end of the data as they get added to the game.  The former can, as mentioned, break older builds, but ensures that everything is grouped together and easy to find.  (all tier 1, tier 2, tier 3, ultimates, etc together) The latter would preserve existing build structures, but over time, would result in a disorganized lump of powers (including ultimates) from various tiers all heaped together in a mess.  For now, I'm choosing to go with organization.

Sorry for any inconveniences, but I do believe it's better for the long term.

---
10/28/2016 - Aesica
 - Added the missing icon for the Sorcery form "Spellcaster."  Seems it wasn't uploaded for some reason.
 - Added tooltips to the export formatting options to help users decide which best suits their needs.
 - Fixed a bug that was causing talents to not update their superstat highlighting when selecting an archetype.
 - Fixed a bug that was causing Magician's Dust to not be selectable.
 - The Tempest now correctly offers Storm Summoner instead of Invocation of Storm Calling.
---
10/24/2016 - Aesica
 - Updated the Devastator, Void, Savage, and (this time for real!) Specialist archetypes to properly reflect what's in the game.
 - Added the Automaton back in. (Yeah, my bad!)
 - Added tooltip text for each archetype explaining how it's obtained as well as which role it gets assigned.
 - Added the rest of the missing icons.
 - Lightened the shade of gray used to denote unavailable powers, or talent stats that don't correspond with chosen superstats.
 - Added some advantages I overlooked in the initial pass, namely those associated with Skarn's Bane, Thundering Kicks, and a few others.
 - Removed export text coloring entirely, instead opting for combinations of bold, italic, and underlining to set things apart.  This allows the text to be more easily shown on a wider variety of forums--both light-themed and dark-themed.
 - Removed the on-click autoselect that happens when clicking the export textarea, allowing those who want to copy only a portion of the export to do so more easily.  The whole export can still be quickly selected for copy/pasta via the newly-added 'Quick Select' button.  It's the best of both worlds!
---
10/16/2016 - Aesica
 - Added and updated a crapton of powers and advantages, bringing the data inline with everything on the current live server.
 - Added more detailed tooltips for several powers (mainly the newer/more recently revised ones) and advantages to help give a clearer indication of what they do.  This is still ongoing.
 - Added an export option for Markdown (Discord, certain forums, etc).
 - Added fuctionality to auto-highlight the build link on the main page as well as the export textarea.
 - Added The Rockstar, The Predator, The Penitent, and The Hexslinger archetypes.
 - Updated The Specialist and The Grimoire archetypes.
 - Updated the layout and style a bit to distinguish this project from its parent, the PowerHouse.
 - Updated the export formatting slightly, most notably with the inclusion of advantage points spent and the way the build name, framework, and link are presented.
 - A few minor fixes most people won't even notice.
