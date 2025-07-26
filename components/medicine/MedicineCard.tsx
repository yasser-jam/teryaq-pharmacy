import { Box, Card, Text, Avatar, VStack, HStack } from '@chakra-ui/react';
import { MenuButton } from '../system/MenuButton';

interface MedicineCardProps {
  medicine: {
    id: number;
    name: string;
    scientificName: string;
    image?: string;
    status?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MedicineCard({ medicine, onEdit, onDelete }: MedicineCardProps) {
  return (
    <Card.Root
      bg="white"
      shadow="sm"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }}
      transition="all 0.2s ease-in-out"
    >
      <Card.Body p={4}>
        <VStack align="stretch" gap={3}>
          {/* Top row with avatar and menu button */}
          <HStack justify="space-between" align="flex-start">
            <Avatar.Root
              size="lg"
              colorPalette="blue"
            >
              <Avatar.Fallback name={medicine.name} />
            </Avatar.Root>
            
            <MenuButton
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </HStack>
          
          {/* Title and scientific name stacked */}
          <VStack align="start" gap={1}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="gray.800"
              lineHeight="tight"
            >
              {medicine.name}
            </Text>
            
            <Text
              fontSize="sm"
              color="gray.600"
              fontStyle="italic"
              lineHeight="tight"
            >
              {medicine.scientificName}
            </Text>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
} 