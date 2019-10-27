import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

const API_URL = 'http://127.0.0.1:8000/api'

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            peopleUploadFeedback: {
                message: '',
                type: ''
            },
            groupsUploadFeedback: {
                message: '',
                type: ''
            }
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }

    onPeopleFileSelected = async (event) => {
        // console.log(event.target.files[0])
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        const uploadPeopleResponse = await fetch(API_URL + '/people', {
            method: 'POST',
            body: formData
        })
        if (uploadPeopleResponse.ok) {
            const responseData = await uploadPeopleResponse.json()
            this.setState({
                data: responseData.collection.data,
                peopleUploadFeedback: {
                    message: responseData.feedback,
                    type: 'success'
                }
            })
        } else {
            this.setState({
                peopleUploadFeedback: 'Something'
            })
        }
    }

    onGroupFileSelected = async (event) => {
        // console.log(event.target.files[0])
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        const uploadGroupResponse = await fetch(API_URL + '/groups', {
            method: 'POST',
            body: formData
        })
        if (uploadGroupResponse.ok) {
            const responseData = await uploadGroupResponse.json()
            this.setState({
                groupsUploadFeedback: {
                    message: responseData.feedback,
                    type: 'success'
                }
            })
        } else {
            this.setState({
                groupsUploadFeedback: 'Something'
            })
        }
    }

    render() {
        const { peopleUploadFeedback, groupsUploadFeedback, data } = this.state
        return (
            <div>
                <div>
                    <label htmlFor="peopleCSVUpload">Upload a people list:</label><br /><br />
                    <input type="file"
                        id="peopleCSVUpload" name="peopleCSVUpload"
                        accept="text/csv"
                        onChange={this.onPeopleFileSelected}
                    />
                </div>
                <br />
                <div style={{ minHeight: 40 }}>
                    <span style={{ color: peopleUploadFeedback.type === 'success' ? 'green' : 'red' }}>
                        {peopleUploadFeedback.message}
                    </span>
                </div>
                <div>
                    <label htmlFor="groupCSVUpload">Upload a group list:</label><br /><br />
                    <input type="file"
                        id="groupCSVUpload" name="groupCSVUpload"
                        accept="text/csv"
                        onChange={this.onGroupFileSelected}
                    />
                </div>
                <br />
                <div style={{ minHeight: 40 }}>
                    <span style={{ color: groupsUploadFeedback.type === 'success' ? 'green' : 'red' }}>
                        {groupsUploadFeedback.message}
                    </span>
                </div>
                <Table celled padded>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                {
                    data.map((person, index) => {
                        console.log('person is: ', person, ' and index is: ', index)
                        return (
                            <Table.Row key={index}>
                                <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                                <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                                <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                                <Table.Cell singleLine>{ person.status }</Table.Cell>
                            </Table.Row>
                        );
                    })
                }

                </Table.Body>
                </Table>
            </div>
    );
}

}

export default ResultsList
