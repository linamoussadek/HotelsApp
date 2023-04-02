-- Note: PostgreSQL does not allow direct triggers, must call functions instead

-- Hotel manager employees should have a manager position
create or replace function check_manager_position() returns trigger as $$
declare
    num_manager_positions integer;
begin
    -- Get number of 'Manager' positions of the employee with employeeID = managerID
    select count(*) into num_manager_positions from EmployeePosition
        where employeeID = new.managerID and positionName = 'Manager';
    
    -- Check that the employee has at least one 'Manager' position
    if num_manager_positions = 0 then
        raise exception 'Hotel managers must have a Manager position';
    end if;

    return new;
end;
$$ language plpgsql;

create trigger check_manager_position_trigger before insert or update on hotel
    for each row
        execute function check_manager_position();





-- After hotel insert, check if manager works at hotel, if not, make insertion into WorksAt
create or replace function check_manager_works() returns trigger as $$
begin
    -- If employee does not work at the hotel, add entry in WorksAt
    if not exists (select * from WorksAt where employeeID = new.managerID and hotelID = new.hotelID) then
        insert into WorksAt (employeeID, hotelID) values (new.managerID, new.hotelID);
    end if;

    return new;
end;
$$ language plpgsql;

create trigger check_manager_works_trigger after insert or update on hotel
    for each row
        execute function check_manager_works();
