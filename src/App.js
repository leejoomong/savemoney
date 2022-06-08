import ExpenseTable from './ExpenseTable';
import Monthly from './Monthly';
import Card from './Card';
import './App.css';
import { Header, Tab } from 'semantic-ui-react'

function App() {
  const panes = [
    {
      menuItem: '지출 항목',
      render: () => <Tab.Pane attached={false}><ExpenseTable/></Tab.Pane>,
    },
    {
      menuItem: '월별',
      render: () => <Tab.Pane attached={false}><Monthly /></Tab.Pane>,
    },
    {
      menuItem: '카드별',
      render: () => <Tab.Pane attached={false}><Card /></Tab.Pane>,
    },
  ]
  return (
    <div className="App">
      <header className="App-header">
        <Header as='h1'>Mrs. Mong's 💸 Diary</Header>
      </header>
      <body className="App-body">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
        {/* activeIndex={1} */}
      </body>
    </div>
  );
}

export default App;
