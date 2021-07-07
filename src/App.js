// React
import React from 'react';

// React Router
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Custom
import TopNav from './TopNav'
import Homepage from './Homepage'
import PersonList from './people/PeoplePage'
import SingleReportPage from './reports/SingleReportPage'
import Footer from './Footer'
import GroupReportPage from './reports/GroupReportPage';


function App() {

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  document.body.style.backgroundColor = darkTheme.palette.background.default

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <TopNav />
        <Switch>
          <Route path="/group-reports">
            <GroupReportPage />
          </Route>
          <Route path="/single-reports">
            <SingleReportPage />
          </Route>
          <Route path="/people">
            <PersonList/>
          </Route>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
