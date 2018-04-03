import * as React from 'react'
import {connect} from 'react-redux'
import {StackableJsonTableComponent} from './StackableJsonTable'
import {Actions, actions, RootState} from '../redux'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import KeySchemaAttributeName = DocumentClient.KeySchemaAttributeName
import {SelectComponent} from './Select'
import {JsonComponent} from './Json'

export class HomeComponent extends React.Component<Props, State> {
  state = {
    json: null,
  }

  render() {
    const {tables, table: {keys = [], items = []}} = this.props
    return (
      <div>
        <div className="pt-control-group pt-fill">
          <SelectComponent title="Endpoint" description="Select endpoint..." onChange={this.handleOnEndpointChange}>
            {tables.map(({TableName}) => <option key={TableName} value={TableName}>{TableName}</option>)}
          </SelectComponent>
          <SelectComponent title="Tables" description="Select table..." onChange={this.handleOnTableChange}>
            {tables.map(({TableName}) => <option key={TableName} value={TableName}>{TableName}</option>)}
          </SelectComponent>
        </div>
        <label className="pt-label pt-inline">
          JSON
          <JsonComponent src={this.state.json || items}/>
        </label>
        <StackableJsonTableComponent
          keys={keys.map(key => key.AttributeName as KeySchemaAttributeName)}
          collection={items}
          onItemSelected={this.handleOnItemSelected}
        />
      </div>
    )
  }

  componentDidMount() {
    this.props.getTables()
  }

  handleOnEndpointChange = ev => {
    const value = ev.target.value

    if (!value.startsWith('__')) {
      // this.props.selectServer(value)
    }
    //todo: add
    console.log(value)
    alert('move to add new endpoint page')
  }
  handleOnTableChange = ev => {
    const value = ev.target.value

    if (!value.startsWith('__')) {
      this.props.selectTable(value)
    }
    //todo: add
    console.log(value)
  }
  handleOnItemSelected = json => {
    this.setState({json})
  }
}

const mapStateToProps = (state: RootState) => state
const mapDispatchToProps = actions
export const Home = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(HomeComponent)

interface StateProps extends RootState {
}
interface DispatchProps extends Actions {
}
interface OwnProps {
}
interface Props extends StateProps, DispatchProps, OwnProps {
}
interface State {
  json: Object | Array<any>
}
