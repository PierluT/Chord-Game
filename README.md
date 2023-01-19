# *Chord Game*

*Authors*: Riccardo Kubler, Riccardo Martinelli, Pierluigi
Tartabini

## 1. Introduction

Chord Game is a Vertical Platform & Music Game. It is created to train chord recogni-
tion skills through a MIDI piano keyboard. The game is suitable for all music lovers and all ages (from 0 to 99+).  
If you are a beginner you can learn and practice to recognize chords and play them on the keyboard from the simplest to the most complex ones. The degree of difficulty gradually increases as you go through the levels and increase the speed of play.  
If, on the other hand, you are a professional pianist musician, you can start with the more difficult levels and modalities.

## 2. Components

To play you have to use a **MIDI keyboard** that you can connect through USB port to
a computer. You can use different features of the keyboard:

- **25 key notes** for playing
- **Oct Up** and **Oct Down Buttons** to shift the keyboard’s range up or down
- **Shift Up** and **Shift Down Buttons** to choose the Game Level (1-2-3)
- **Shift Left** and **Shift Right** to choose the Game Mode (Read or Listen)
- **Knob** on top-right to control the velocity of the Game page

<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/MIDIkeyboard.png?token=GHSAT0AAAAAAB43V2LUWGVQY3A2BOKI5JZEY6I7GQQ" width="500"/>

To choose Avatar, Game Mode and Game Level you can use also the mouse click (or touch-
board click) of your computer. Remember to turn on the speakers of your computer!

## 3. Homepage

In the Homepage you have to choose your favourite musician Avatar (**Beethoven**, **Mozart** or **Bach**).  
Then, you can train with two different modalities. If you want to become better at recognizing sight-reading chord music you select the **READ mode**. Instead, in you want to improve your perfect pitch, you select the **LISTEN mode**.  
Finally, according to your skills, you has to select the difficulty level (from 1 to 3).

<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/Homepage.png?token=GHSAT0AAAAAAB43V2LUHIAR6XQW2FAENKA2Y6I67QQ" width="1000"/>

## 4. Gamepage

### 4.1. How to start

After setting the Homepage, you click on the button **PLAY** to start game. The Gamepage appears and the game starts: the goal is to make the musician rise on the platforms as high as possible to become the "Chord Master".

### 4.2. Read mode

If you choose the **Read mode** you will have to play the chords you read above the platforms. To go from one platform to another, you must play with the MIDI keyboard all the notes that make up the chord.  

The logic of chords succession is through the major keys: each game always starts with the key ofCand progressively moves to the other keys following the circle of fifths (randomly each game will face the keys with either sharps or flats). For instance, the succession starts with chords in the key of *C*, then moves to the key of *G*, then to the key of *D*, etc. Each note of the major scale belongs to a specific category of chords (see "Music Theory" in the paragraph dedicated). In fact, the chords that are generated are specific to that key in that scale degree.

This mode consists of **3 levels** of training on:

1. **Triads**
2. **Sevenths**
3. **Ninths**

To slightly complicate the game there may be Secondary Dominants (with a percentage
of 10% of all chords) or Substitute Dominants (5%), which resolve on the correct degree of the current key. In the second level it is possible to find triads for 25% of the chords, while in the third level it is possible to find triads for 10% and sevenths for 15% of the
chords.

### 4.3. Listen mode

If you choose the **Listen mode** you will have to play the chords you listen. Above the platforms you read the root note of the chord (as a reference to help those without perfect pitch). You will ear first the arpeggiated chord, then all notes simultaneously. To go from one platform to another, you must play with the MIDI keyboard all the notes that make up the chord.

In this play mode, the chord succession begins with chords formed on the natural notes
(i.e. white notes) of the chromatic scale (for the first 33% of the chords for each level), then continues on chords formed on the altered notes (sharps or flats).

This mode consists of **3 levels** of training on:

1. **Major and Minor Triad chords**
2. **Diminished and Augmented Triad chords**
3. **Seventh chords**

In the second level there are also major and minor chords , as well as diminished and
augmented chords (with equal proportion 25%). While in the third level, only seventh
chords will need to be recognized among all seven kind of sevenths.

<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/1.png?token=GHSAT0AAAAAAB43V2LUX5MRG4KGNEWNREZ4Y6I62MQ" width="1000"/>
<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/2.png?token=GHSAT0AAAAAAB43V2LV77NQLC3XLJYJHRPCY6I66DQ" width="1000"/>
<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/3.png?token=GHSAT0AAAAAAB43V2LVE3QDRRUZS7DEVWRCY6I66RQ" width="1000"/>

## 5. Statistics

In the sidebar of the Gamepage you can view statistics: modality, level, lives left, score and a multiplicator.  
Each jump you can do, you get some points and you increment your score. In the first level you get +50 point for each jump, in the second +100 and in the third +150. Additionally you can get a bonus in you can do 5 jumps without errors.  
You can automatically pass the level to the next one, if you complete all the sequence of chords. This is a checkpoint: in fact if you loose you can restart from the beginning of that level.

## 6. Errors and Game Over

For each game you will have 3 lives at your disposal. If even one wrong note of
the chord is played, you will lose one life. Lose all lives, the game ends and you can start a new game with the same level and mode.  
If the avatar reaches the ground before you have played the next chord, you will directly lose all three lives or those remaining.  
If you lose (Game Over), in any case, a message appears with the list of the 3 errors you did and the right solutions. You can restart the game clicking on the Restart Button. To change the avatar, the modality and/or the level you have to return to Homepage clicking on the Reset button.

<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/GameOver.png?token=GHSAT0AAAAAAB43V2LULN47O77W2IQ7LGMKY6I667Q" width="250"/>

## 7. Winner

If you will complete all the jumps of the current level, you automatically switch to the next level. This is a checkpoint because, if you loose, you can restart from the current level in which you arrive. And if you complete all 3 levels you win and you become the "Chord Master".

<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/Win.png?token=GHSAT0AAAAAAB43V2LVGRVOT2K7AW3AL7TEY6I7AGA" width="250"/>

## 8. Chord Notation & Music Theory

**TRIAD CHORDS:**

- Major (major third, perfect fifth): no symbols   
e.g. *C ⇒ C−E−G*
- Minor (minor third, perfect fifth): **m**  
e.g. *Cm ⇒ C−Eb−G*
- Augmented (major third, augmented fifth): **aug**  
e.g. *Caug ⇒ C−E−G#*
- Diminished (minor third, diminished fifth): **dim**  
e.g. *Cdim ⇒ C−Eb−Gb*

**SEVENTH CHORDS:**

- Dominant seventh (major third, perfect fifth, minor seventh): **7**  
e.g. *C7 ⇒ C−E−G−Bb*
- Minor seventh (minor third, perfect fifth, minor seventh): **m7**  
e.g. *Cm7 ⇒ C−Eb−G−Bb*
- Half-diminished seventh (minor third, diminished fifth, minor seventh): **m7b5**  
e.g. *Cm7b5 ⇒ C−Eb−Gb−Bb*
- Major seventh (major third, perfect fifth, major seventh): **maj7**  
e.g. *Cmaj7 ⇒ C−E−G−B*
- Diminished seventh (minor third, diminished fifth, diminished seventh): **dim7**  
e.g. *Cdim7 ⇒ C−Eb−Gb−Bbb*
- Minor major seventh (minor third, perfect fifth, major seventh): **mMaj7**  
e.g. *CmMaj7 ⇒ C−Eb−G−B*
- Augmented seventh (major third, augmented fifth, major seventh): **maj75#**  
e.g. *Cmaj75# ⇒ C−E−G#−B*

**NINTH CHORDS:**

- Dominant ninth (major third, perfect fifth, minor seventh, major ninth): **9**  
e.g. *C9 ⇒ C−E−G−Bb−D*
- Dominant minor ninth (major third, perfect fifth, minor seventh, minor ninth): **7b9**  
e.g. *C7b9 ⇒ C−E−G−Bb−Db*
- Dominant aug. ninth (major third, perfect fifth, minor seventh, aug. ninth): **7#**  
e.g. *C7#9 ⇒ C−E−G−Bb−D#*
- Major ninth (major third, perfect fifth, major seventh, major ninth): **maj9**  
e.g. *Cmaj 9 ⇒ C−E−G−B−D*
- Minor ninth (minor third, perfect fifth, minor seventh, major ninth): **m9**  
e.g. *Cm9 ⇒ C−Eb−G−Bb−D*

**CHORD-SCALE THEORY**

In music there is a duality between chords and scales. For each major key (we used
for the chords’ succession in our game logic) we can recognize different types of chords on each degree of the scale. The following table presents which chords can be created on each degree of theCmajor scale (or key):

<img src="https://raw.githubusercontent.com/PierluT/Chord-Game/main/images/Chord-scale%20table.png?token=GHSAT0AAAAAAB43V2LUFWRJKMWWJYJJYUEMY6I7J4A" width="750"/>

**SECONDARY DOMINANTS & SUBSTITUTE DOMINANT**

The Dominant chords in music are used to extend and embellish the harmony in a chord
progression.  
In the chord sequences presented in the Game sometimes a dominant chord (secondary or
substitute one) appears as the fifth degree of a grade of scale. It create a kind of tension and solves to the right grade of the current scale.  
The secondary dominant and the substitute dominant are not involved for the *I* and the *VII* grade of the scale.

For example for each grade of the *C major key* we have:

- Secondary dominants ⇒ *[−, A 7 , B 7 , C 7 , D 7 , E 7 ,−]*
- Substitute dominants ⇒ *[−, Eb 7 , F 7 , Gb 7 , Ab 7 , Bb 7 ,−]*
- Current key ⇒ *[Cmaj7, Dm7, Em7,  Fmaj7, G7, Am7, Bm7b5]*

E.g. *D7* and *Ab7* are respectively the secondary and the substitute dominants of *G* (*V* grade of *C*).

##9. Tools & Coding

To develop the project we used mainly **Javascript**, **HTML** and **CSS**; we implemented also **jQuery** to customize the "Winner" and "Game Over" dialogs.

### 9.1. Libraries

In this project we used also external libraries for 3 themes:

- make the homepage graphic responsive
- embody and deal with music’s theory concepts
- embody and link sounds to player’s actions

For the first point we used **Bootstrap**, a free and open-source CSS framework directed at responsive, mobile-first front-end web development.  
For the second point we used **tonal.js**,a music theory library that contains functions to manipulate tonal elements of music (note, intervals, chords, scales, modes, keys). It was also useful especially for coverting MIDI inputs into notes and vice versa.  
For the last point we used **howler.js**, that makes working with audio files in JavaScript.
