#Design

- Are we designing for inspiration or customization or both?<br>
v1.0 customization
    
- What’s the entry point to the configurator?<br>
v1.0 customize a object on a layer based image to print on object

- How many presets, and how to define them?<br>
v1.0 Layerd: 1-4 Persons, n Sitspaces, m Background, q foregrounds (rain, back of bench)

- Do we provide recommendations or labels with presets?<br>
v1.0 Product examples for scenes, ?Text Examples/Labels?

- Do we ask for some preferences before suggesting a preset?<br>
No

- How do we design a selection of presets?<br>
v1.0 layered objects, containing layered objects

- Do we need to integrate search or filtering?<br>
v2.0

- Have we defined smart defaults?<br>
v1.0 via Landingpages

- Is the product always visible, on mobile and desktop?<br>
yes

- Do we always display the current price?<br>
Editor front end

- Do we use a 3D view of the product?<br>
Yes, purchase preview

- Do we use thumbnails or add a preview on hover or tap?<br>
v1.0 both => preview on hover on dektop? Mobile open (double click?)

- Should it be possible to change the view between 3D and photos?<br>
v1.0 Edit on 2D, with preview button

- How do we design navigation, with pins (floating bubbles) or the “previous/next” pattern?<br>
v1.0 floating bubbles, triggering outside menus

- Is it possible to jump from the current step to a previous one?<br>
There are no steps. v2.0 History?

- Do we highlight the current step and already finished steps — and, if so, how?<br>
v1.0 wire drawings without color

- Is it clear how to undo a change or feature?<br>
v2.0

- Do we use animations and transitions for rotation, a change in price or a re-rendering of components?<br>
maybe very basic for images, Bubbles pop out (animate.css)

- Do we complement the 3D view with thumnbails or photo slider acting as shortcuts to jump to a particular angle?<br>
no

- How do we design the addition or removal of a choice (color, icon, overlay)?<br>
v1.0 layer selections and alternatives (first time in layer => select type, bsp fe-/male person, 1-4 person etc); callbacks on layer switches

- For every step, do we need to group some options to limit scope?

in that sense no. there needs to be a selection per layer (hair etc.) which defines sublayers, which switch images

- For every step, do we display the effect of a selected feature on the price?<br>
not sure jet

- For every step, do we explain and highlight dependencies (for example, if some options are mutually exclusive)?<br>
no (hopefully)

- Do we provide context-sensitive inspiration to simplify a choice?<br>
v1.0 yes foreach layer (example image)

- Do we display dependencies (for example, if some options are mutually exclusive)?<br>
there are non because of pyramide structure. 

- Do we make recommendations to nudge a user towards a choice?<br>
v2.0 needs a lot of thinking and additional data. 

- Do we integrate a feature-comparison table at some steps?<br>
v2.0 nice idea

- Do we have a full-screen view for the product rendering or zooming in and out?<br>
v2.0 no bt responsive design in mind
v1.0 Konzept für Layerdesign

- Do we provide extra details (for example, financing, leasing, reservations, sharing)?<br>
no need, "normal" checkout

- Do we integrate a chat bot or conversational UI?<br>
v2.0

#Interaction

- Is it possible to jump from the current step to a previous one?<br>
v2.0 History

- Is the “next” step never empty, but rather contains a smart default value?<br>
no, there are no steps

- Should the user automatically move to the next step when finished with the current one?<br>
no, pyramide design (v2.0 to next layer)

- For every step, do we show the effect of a selected feature on the price immediately?<br>
v2.0

- Is it possible to save or label the current snapshot of the configuration?<br>
v1.0 Printe mutliple on one cup

- Does checkout contain a link to edit, change or adjust the configured model?<br>
v1.0 foreach snapshot

- Are we using drag and drop functionality?<br>
no, maybe something in v2.0 => Mobile requirements to high

#Performance

- Is visual feedback of the product preview instant on 3G?<br>
no 3D; Tacking care of subscriptions to prevent overflow; keep payloads small;

- Do we store choices automatically? What happens upon page refresh?<br>
v1.0 local session current + snapshots<br>
v1.5 click tracking + advanced useage analysis

- Are we lazy-loading assets (and options!) for performance?
v1.0 yes, render contents, and preload others

#Accessibility

- Are all critical elements (“previous/next” buttons, summary, visuals) focusable?<br>
v2.0

- Are all UI controls labeled for screen reader users?<br>
v2.0

- Are icons intuitive to all users, or do they include visible text labels for usability?<br>
v2.0

- Is the 3D slider fully accessible?<br>
v2.0

- Are changes announced via the screen reader?<br>
v2.0

- For every step, is the summary of all changes always accessible?<br>
v2.0

- Is color contrast bright enough to make text stand out on top of backgrounds?<br>
v2.0

- Are headings and landmarks used to convey hierarchy and semantic structure?<br>
v2.0
