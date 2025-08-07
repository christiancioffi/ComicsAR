# ComicsAR

This project is about an **AR** website where user can see virtual objects on top of markers and interact with them.
The user can choose between two types of markers: **implicit markers** (i.e. Hiro markers) and **explicit markers** (i.e. images). In this project, the virtual objects are predefined, as is the image to be recognized in case NFT (Natural Feature Tracking), also known as Image Tracking, is used.
In both modes, the following are displayed:
- the local 3D reference system of the marker (the origin coincides with the center of the marker);
- the 3D virtual object (placed at the center of the marker);
- the positions of the camera, marker, and virtual object;
- the camera's position relative to the marker;
- the object's position relative to the marker;
- the total distance between the object and the marker;
- the total distance between the marker and the camera.
The unit of measurement for positions and distances is **meters**. Both AR.js and MindAR.js use a world reference system centered on the camera—meaning the world moves relative to the camera.

## Interaction

The user can interact with the virtual objects:
- **Two-finger gesture**: uniformly scales the virtual object along all three axes (X, Y, and Z);
- **One-finger gesture**: rotates the virtual object around the X and Y axes.

## Details

AR.js considers a single unit to be equal to the estimated width of the marker (regardless of the marker type). This should be taken into account when positioning virtual objects or calculating positions and distances. MindAR.js is very similar, but when calculating positions and distances, it assumes the marker's width is 1000 units (see https://github.com/hiukim/mind-ar-js/issues/537#issuecomment-2549723947). To obtain real-world distances in meters:
- in the case of AR.js, values must be scaled by the real width of the marker (expressed in meters).
- in the case of MindAR.js, values must be scaled by the real width of the marker multiplied by 1000.

## Screenshots

![Homepage](https://i.ibb.co/Q3WjD48G/Screen1.jpg)
![Hiro](https://i.ibb.co/ZpK1Gkg1/Screen2.jpg)
![Hiro-Interaction](https://i.ibb.co/NgV7wjr6/Screen3.jpg)
![NFT](https://i.ibb.co/RG2tsTn4/Screen4.jpg)
![NFT-Interaction](https://i.ibb.co/gZq7D1xB/Screen5.jpg)


## Link
The website is reachable at this [link](https://develop.ewlab.di.unimi.it/ComicsAR/).
Markers are downloadable from this repository.
