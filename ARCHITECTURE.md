

### Feature List

The goal of this project is to replicate the graphic currently at
http://mappingpoliceviolence.org/cities, so that the design and functional
limitations of the tableau software can be more easily overcome. Ideas for
future work notwithstanding, this project must begin by reimplementing the
current graphic.

The current interactive displays the number of killings by police broken down by
city and race. It allows for filtering by a number of different characteristics
of the city, as well by the race of the victim. The full list of available
filters is as follows:

1. City name -- should limit the displayed cities to only those prefixed by the
free-text entry
2. State where the city is -- dropdown
3. City population -- dual-slider
4. Murder rate -- dual-slider
5. Violent crime rate -- dual-slider
6. Race of victim

The data narrowed through these filters is then displayed in three charts
simultaneously. The police muder rate (killings per capita) is shown per city,
broken down by race in side-by-side bars. The total number of police killings is
shown per city, broken down by race in stacked bars. The total number of
killings of unarmed victims is shown per city, broken down by race in stacked
bars (same as middle graphic).


### Design Thoughts

These three charts could easily be enlarged and hidden behind tabs to facilitate
mobile viewing. They represent largely the same underlying data and don't need
to be compared side-by-side.

The colors are the only thing that identifies the racial disparity. Using
red/orange/purple is kind of a weird choice, but maybe intentional? I think the
impact would be more powerful if something closer to skin tones was used, more
intuitive understanding would be possible.

I think the filters should go underneath the graphic as they are not as
important as just the data itself. The tableau UI is a little confusing too.
Lots of hidden functionality that appears only on hover with complicated icons
that are hard to interpret. Also the dual slider + free text inputs are a lot. I
think all of that is overkill. A single dual slider should be enough.

The race filter functionality (hover to reveal keep-only/exclude options) seems
like super overkill. Tapping the filter should just toggle it. And it shouldn't
disappear when not present, it should just fade.

Might be interesting to compare local police homicide rate to local homicide
rate, i.e. where are police more deadly than a randomly chosen civilian.

All of this is leaving aside the question of whether or not this is really the
most effective way of displaying this information.


### Technical

I am using React + Redux and D3 for the core functionality. React will control
the entire control panel/legend, and will pass data to a each of the three
separate D3 components (as need if they are tabbed) to render the data itself.
The D3 components will be 'dumb', they will be handed data and render it,
calling callbacks for any necessary events (which will be minimized).


# Data

I will need the following data to complete this (per city):

- Name of city
- State
- Population
- Black population
- Number of victims of police homicide (for each of black, white, hispanic, asian/pacific islander)
- Murder rate
- Violent crime rate

Structure/handling TBD. (But all of this data is available in spreadsheet.)


# State design

The redux state will be defined as follows:
```
{
  filter: {
    cityPrefix: String,
    crimeRate: [Number, Number],
    maxPossibleCrimeRate: Number,
    maxPossibleMurderRate: Number,
    maxPossiblePopulation: Number,
    murderRate: [Number, Number],
    population: [Number, Number], // [min, max]
    race: [String, ...],
    state: String,
  },
  data: {...}, // Source data (unfiltered)
  network: {}, // Where in process requests are tracked
}
```

Actions:
- Change city prefix
- Change state
- Change population
- Change murder rate
- Change crime rate
- Toggle race
