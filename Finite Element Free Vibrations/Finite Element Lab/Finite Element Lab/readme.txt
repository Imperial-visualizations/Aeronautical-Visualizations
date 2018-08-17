This visualisation is a basic lookup and plot script. The results are stored in an array at the top of the script (a further improvement could be to use JSON).
The required eigenvectors and frequencies are then retrieved when a slider's value is changed. The eigenvectors plotted over time using a time increment and
sin. This is done with plotly animate. The linear combinations vis. is the same thing, except instead of a single eigenvectors, two eigenvctors are looked up.
Future improvements could be to do a more general linear combination and also on the 2D projection plots to include a marker to follow the wing and fuselage intersection.
Also, the code should be modified to avoid the use of so many global variables. Finally this a small bug that when the sliders are adjusted during the 2D projection animation,
for an instance, something random is plotted.

Note that the layout is done with grid CSS rather than the standard container used in the Imperial Visualisations CSS
