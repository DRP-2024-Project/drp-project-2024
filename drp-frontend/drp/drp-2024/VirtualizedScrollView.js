import React from 'react';
import { FlatList } from 'react-native';
import { v4 as uuidv4 } from 'uuid';


const VirtualizedScrollView = ({ children }) => {
  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
    />
  );
};

export default VirtualizedScrollView;