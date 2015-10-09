# Abstracting Rumble

### Use Case: Hosts and Visitors

#### Problem

- There isn't one big group of Users to match
- There are two, the hosts and the Users

#### Solution

- We have two different Models, Host and Visitor
- We match on Host and Visitor

##### Abstraction

- Allow any number of "Groups"
- We have each matchable have a "type"
- We allow Each matchable object to have arbitrary Characteristics
- When we match, we are matching to include one indvidual from each group?
- We have a Match Model?



### Use Case: Date Seperation and Exception

#### Problem

- Not all visitors are going to be on the same day
- hosts sometimes can't make a day

#### Solution

- Visitor gets a 'visitDate' property that seperates each rumble
- Hosts get 'exceptionDates' property that allows them to avoid dates

#### Abstraction

- Matching can be be done based off a key of a group
- the same group or other groups can have key exceptions
- Has dimension equal to expected values
- does not have a exception to expected value


### Use Case: Limit of matches within a Time by Section Grid

#### Problem

- Visitors are expecting a certian time to go for a visit
- Hosts only have certian sections that they can do
- We must only allow a certian amount of matches witin each Time/Section pair

#### Solution

- We created a 'ConstraintObject' where we iterate all possible Time/Section values
- We allow the user to define match limit witin any of the possible Time/Section values
- When we do the rumble, we evaluate whether

#### Abstraction

- Match Model based
- Allow the limitation of number of matches
- Allow multiple limitation groups
- Allow limitation groups to be based off two Dimensions
- Allow Dimension to only allow certian values



### Use Case: Sorting by Matches Recieved

#### Problem

- Two individuals with the same match score will not recieve equal number of matches
- The first person in the alphabet is hit both times

#### Solution

- We have a "MatchesRecieved" Property on a user
- Whenever a user recieves a match, That property is incremented
- When we do a match, we sort by MatchesRecieved

#### Abstraction

- This is fine as is
