# Social Media Dashboard
[![pipeline status](https://gitlab.com/yahyasahaja/social-media-dashboard/badges/master/pipeline.svg)](https://gitlab.com/yahyasahaja/social-media-dashboard/commits/master)

---

[DEMO](https://socialmedia.ngopi.men)
I'm using **React JS** as a framework to develop this app

## Project Structure

- ``src/components`` contains all shared components
- ``src/contexts`` contains all contexts, could be represented as ViewModel
- ``src/screens`` contains all the screens inside this app, structured by route logic

## Libraries
- For the UI, I'm using `material-ui`
- Styling using `styled-components`
- State management usign `React Context API`

## Architecture

I'm using (Model-View-ViewModel) as an app architecture. 
- The Model can be found at `https://jsonplaceholder.typicode.com/`.
- The View can be found at, `screens`
- The ViewModel can be represented as the context itself. So all the requests can only be triggered from ViewModel. There's no way to direct interaction from ViewModel and View

## CI/CD
Thanks for Gitlab CI and my aws account that this can be up at [https://socialmedia.ngopi.men](https://socialmedia.ngopi.men)